import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutomationService {
  overlaySubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  getOverlay() {
    return this.overlaySubject;
  }

  getListOfElementsByTagAndClasses = (
    hoveredElement: HTMLElement,
    elementsList: HTMLElement[]
  ) => {
    let result: HTMLElement[] = [];
    let className = '';
    let tagName = hoveredElement.tagName;

    for (let i = 0; i < hoveredElement.classList.length; i++) {
      className += '.' + hoveredElement.classList[i];
    }

    for (let i = 0; i < elementsList.length; i++) {
      let button = elementsList[i].querySelector(
        `${tagName.toLowerCase()}${className}`
      );
      if (button) result.push(button as HTMLElement);
      if (
        elementsList[i].tagName === tagName &&
        elementsList[i].className === hoveredElement.className
      ) {
        result.push(elementsList[i] as HTMLElement);
      }
    }

    return result;
  };

  getListOfElementsByTagName = (
    tagName: string,
    elementsList: HTMLElement[]
  ) => {
    let result: HTMLElement[] = [];

    for (let i = 0; i < elementsList.length; i++) {
      let input = elementsList[i].querySelector(`${tagName.toLowerCase()}`);
      if (input) result.push(input as HTMLElement);
      if (elementsList[i].tagName === tagName.toUpperCase()) {
        result.push(elementsList[i] as HTMLElement);
      }
    }

    return result;
  };

  private getListOfElementsFromULOrTable = (list: HTMLCollection) => {
    let result: HTMLElement[] = [];

    for (let i = 0; i < list.length; i++) {
      result.push(list[i] as HTMLElement);
    }

    return result;
  };

  private getPossibleList = (
    element: HTMLElement,
    childClassName: string,
    className: string,
    tagName: string
  ): HTMLElement[] => {
    const children = element.children;
    let result: HTMLElement[] = [];

    if (children.length < 2) {
      return [];
    }

    for (let i = 0; i < children.length; i++) {
      if (className) {
        if (
          children[i].classList.contains(className) &&
          children[i].tagName === tagName &&
          children[i].querySelector(`.${childClassName}`)
        ) {
          result.push(children[i] as HTMLElement);
        }
      } else if (
        children[i].tagName === tagName &&
        children[i].querySelector(`.${childClassName}`)
      ) {
        result.push(children[i] as HTMLElement);
      }
    }

    return result;
  };

  getListOfElementsForLoop = (
    hoveredElement: HTMLElement,
    parentNestings: number = 5
  ) => {
    let parent = hoveredElement.parentElement;
    let prevParent = hoveredElement;
    let i = 0;
    let posssibleList: HTMLElement[];

    let closest =
      hoveredElement.closest('ul') || hoveredElement.closest('tbody');

    if (closest) {
      return this.getListOfElementsFromULOrTable(closest.children);
    }

    while (i < parentNestings) {
      if (parent) {
        posssibleList = this.getPossibleList(
          parent,
          hoveredElement.classList[0],
          prevParent.classList[0],
          prevParent.tagName
        );

        if (posssibleList.length > 1) {
          return posssibleList;
        }
      }

      if (parent && parent.parentElement) {
        prevParent = parent;
        parent = parent.parentElement;
      }
      i++;
    }

    return null;
  };

  resetAction(
    list: HTMLElement[],
    classNameHighlighted: string,
    classNameClicked: string
  ) {
    this.removeClassNameFromList(list, classNameHighlighted);
    this.removeClassNameFromList(list, classNameClicked);
  }

  addClassNameToList = (list: HTMLElement[], className: string) => {
    for (let i = 0; i < list.length; i++) {
      list[i].classList.add(className);
    }
  };

  removeClassNameFromList = (list: HTMLElement[], className: string) => {
    for (let i = 0; i < list.length; i++) {
      list[i].classList.remove(className);
    }
  };
}
