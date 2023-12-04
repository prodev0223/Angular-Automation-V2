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

  constructor(private automationService: AutomationService) {}

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
    document.removeEventListener('mouseover', this.mouseOverListener);
    document.removeEventListener('click', this.clickListener, true);
  };

  ngOnInit() {
    this.automationService.showOverlay();
  }

  ngAfterViewInit() {
    document.addEventListener('mouseover', this.mouseOverListener);
    document.addEventListener('click', this.clickListener, true);
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
    document.addEventListener('mouseover', this.mouseOverListener);
    document.addEventListener('click', this.clickListener, true);
  }

  ngOnDestroy() {
    this.automationService.resetAction(
      this.highlightedElements,
      this.highlightedClassName,
      this.clickedClassName
    );
    document.removeEventListener('mouseover', this.mouseOverListener);
    document.removeEventListener('click', this.clickListener, true);
  }
}
