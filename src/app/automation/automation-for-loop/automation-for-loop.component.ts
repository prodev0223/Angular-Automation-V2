import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AutomationService } from '../automation.service';

@Component({
  selector: 'automation-for-loop',
  templateUrl: './automation-for-loop.component.html',
})
export class AutomationForLoopComponent implements AfterViewInit {
  @Output() onSaveItems = new EventEmitter<HTMLElement[]>();

  highlightedElements: HTMLElement[] = [];
  clickedElements: HTMLElement[] = [];
  highlightedClassName: string = 'automation-block-highlighted';
  clickedClassName: string = 'automation-block-clicked';

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
    if (element.closest('automation')) return;

    let children = this.automationService.getListOfElementsForLoop(element);

    this.automationService.removeClassNameFromList(
      this.highlightedElements,
      this.highlightedClassName
    );

    if (children) {
      this.highlightedElements = children;
      this.automationService.addClassNameToList(
        children,
        this.highlightedClassName
      );
    }
  };

  private mouseDownListener = (event: MouseEvent) => {
    event.preventDefault();
  };

  private clickListener = (event: MouseEvent) => {
    let element = event.target as HTMLElement;
    if (
      element.closest('automation') ||
      !this.highlightedElements ||
      !('length' in this.highlightedElements)
    )
      return;

    event.preventDefault();
    event.stopImmediatePropagation();

    for (let i = 0; i < this.highlightedElements.length; i++) {
      if (this.highlightedElements[i].contains(element)) {
        this.highlightedElements[i].classList.add('automation-block-clicked');
        this.clickedElements.push(this.highlightedElements[i]);
        document.removeEventListener('mouseover', this.mouseOverListener);
        break;
      }
    }

    if (this.clickedElements.length > 1) {
      document.removeEventListener('click', this.clickListener, true);
      document.removeEventListener('mousedown', this.mouseDownListener);
    }
  };

  reset() {
    this.automationService.removeClassNameFromList(
      this.highlightedElements,
      this.highlightedClassName
    );
    this.highlightedElements = [];

    this.automationService.removeClassNameFromList(
      this.clickedElements,
      this.clickedClassName
    );
    this.clickedElements = [];
    this.addEventListeners();
  }

  save() {
    this.onSaveItems.emit(this.highlightedElements);
    for (let i = 0; i < this.highlightedElements.length; i++) {
      this.highlightedElements[i].classList.remove(
        'automation-block-highlighted'
      );
      if (
        !this.highlightedElements[i].classList.contains(
          'automation-block-clicked'
        )
      )
        this.highlightedElements[i].classList.add('automation-block-clicked');
    }
  }

  ngAfterViewInit() {
    this.addEventListeners();
  }

  ngOnDestroy() {
    this.removeEventListeners();
  }
}
