import {
  Component,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AutomationService } from '../automation.service';

@Component({
  selector: 'automation-actions-input',
  templateUrl: './automation-actions-input.component.html',
})
export class AutomationActionsInputComponent
  implements AfterViewInit, OnDestroy {
  @Output('onReset') onResetApp = new EventEmitter();
  @Input() elementsList: HTMLElement[] = [];

  highlightedElements: HTMLElement[] = [];
  isChosen = false;
  isDone = false;
  text = '';
  highlightedClassName: string = 'automation-element-highlighted';
  clickedClassName: string = 'automation-element-clicked';

  constructor(private automationService: AutomationService) {}

  private addEventListeners() {
    document.addEventListener('mouseover', this.mouseOverListener);
    document.addEventListener('mousedown', this.mouseDownListener);
    document.addEventListener('click', this.clickListener, true);
  }

  private removeEventListeners() {
    document.removeEventListener('mouseover', this.mouseOverListener);
    document.removeEventListener('mousedown', this.mouseDownListener);
    document.removeEventListener('click', this.clickListener, true);
  }

  private mouseOverListener = (event: MouseEvent) => {
    let element = event.target as HTMLElement;
    if (
      !element.closest('.automation-block-clicked') &&
      !element.classList.contains('automation-block-clicked')
    )
      return;

    let inputs = this.automationService.getListOfElementsByTagName(
      'input',
      this.elementsList
    );

    this.automationService.removeClassNameFromList(
      this.highlightedElements,
      this.highlightedClassName
    );

    this.highlightedElements = inputs;
    this.automationService.addClassNameToList(
      this.highlightedElements,
      this.highlightedClassName
    );
  };

  private mouseDownListener = (event: MouseEvent) => {
    event.preventDefault();
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

  ngAfterViewInit() {
    this.addEventListeners();
  }

  runBot() {
    for (let i = 0; i < this.highlightedElements.length; i++) {
      (this.highlightedElements[i] as HTMLInputElement).value = this.text;
    }
    this.isDone = true;
  }

  reset() {
    this.isChosen = false;
    this.isDone = false;
    this.text = '';
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
