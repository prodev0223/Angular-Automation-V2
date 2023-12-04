import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AutomationService } from '../automation.service';
import * as rxjs from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'automation-actions-button',
  templateUrl: './automation-actions-button.component.html',
})
export class AutomationActionsButtonComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Output('onReset') onResetApp = new EventEmitter();
  @Input() elementsList: HTMLElement[] = [];

  highlightedElements: HTMLElement[] = [];
  isChosen = false;
  isDone = false;
  highlightedClassName: string = 'automation-element-highlighted';
  clickedClassName: string = 'automation-element-clicked';
  onClickSubscription: Subscription = new Subscription();

  constructor(private automationService: AutomationService) {}

  private addEventListeners() {
    document.addEventListener('mouseover', this.mouseOverListener);
    document.addEventListener('click', this.clickListener, true);
  }

  private removeEventListeners() {
    document.removeEventListener('mouseover', this.mouseOverListener);
    document.removeEventListener('click', this.clickListener, true);
  }

  private mouseOverListener = (event: MouseEvent) => {
    let element = event.target as HTMLElement;
    if (!element.closest('.automation-block-clicked')) return;

    let buttons = this.automationService.getListOfElementsByTagAndClasses(
      element,
      this.elementsList
    );

    this.automationService.removeClassNameFromList(
      this.highlightedElements,
      this.highlightedClassName
    );

    this.highlightedElements = buttons;
    this.automationService.addClassNameToList(
      buttons,
      this.highlightedClassName
    );
  };

  private clickListener = (event: MouseEvent) => {
    let element = event.target as HTMLElement;
    if (element.closest('.automation')) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    if (this.highlightedElements.length) this.isChosen = true;
    this.automationService.removeClassNameFromList(
      this.highlightedElements,
      this.highlightedClassName
    );
    this.automationService.addClassNameToList(
      this.highlightedElements,
      this.clickedClassName
    );
    this.removeEventListeners();
  };

  ngOnInit() {
    this.automationService.showOverlay();
  }

  ngAfterViewInit() {
    this.addEventListeners();
  }

  runBot() {
    for (let i = 0; i < this.highlightedElements.length; i++) {
      this.highlightedElements[i].click();
    }
    this.isDone = true;
    this.automationService.hideOverlay();
  }

  reset() {
    this.isChosen = false;
    this.isDone = false;
    this.automationService.resetAction(
      this.highlightedElements,
      this.highlightedClassName,
      this.clickedClassName
    );
    this.highlightedElements = [];
    this.addEventListeners();
  }

  ngOnDestroy() {
    this.automationService.resetAction(
      this.highlightedElements,
      this.highlightedClassName,
      this.clickedClassName
    );
    this.removeEventListeners();
  }
}
