import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AutomationActionsButtonComponent } from './automation-actions-button.component';
import { AutomationService } from '../automation.service';
import { DebugElement } from '@angular/core';

describe('AutomationActionsButtonComponent', () => {
  let component: AutomationActionsButtonComponent;
  let fixture: ComponentFixture<AutomationActionsButtonComponent>;
  let mockAutomationService: AutomationService;

  beforeEach(async () => {
    mockAutomationService = jasmine.createSpyObj<AutomationService>(
      'AutomationService',
      {
        getListOfElementsByTagAndClasses: [],
        resetAction: undefined,
        removeClassNameFromList: undefined,
        addClassNameToList: undefined,
      }
    );

    await TestBed.configureTestingModule({
      declarations: [AutomationActionsButtonComponent],
      providers: [
        { provide: AutomationService, useValue: mockAutomationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AutomationActionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate list of buttons if mouseover triggered inside chosen block', async () => {
    const document = fixture.nativeElement.ownerDocument;

    let list = document.createElement('ul');
    for (let i = 0; i < 5; i++) {
      let listItem = document.createElement('li');
      listItem.classList.add('automation-block-clicked');
      listItem.appendChild(document.createElement('button'));
      list.appendChild(listItem);
    }

    document.body.appendChild(list);

    component.ngAfterViewInit();
    fixture.detectChanges();

    list.querySelector('button').dispatchEvent(
      new MouseEvent('mouseover', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    );
    fixture.detectChanges();
    list.remove();
    expect(
      mockAutomationService.getListOfElementsByTagAndClasses
    ).toHaveBeenCalled();
  });

  it('should calculate list of buttons if the list items are buttons itself', async () => {
    const document = fixture.nativeElement.ownerDocument;

    let list = document.createElement('div');
    for (let i = 0; i < 5; i++) {
      let button = document.createElement('button');
      button.classList.add('automation-block-clicked');
      list.appendChild(button);
    }

    document.body.appendChild(list);

    component.ngAfterViewInit();
    fixture.detectChanges();

    list.querySelector('button').dispatchEvent(
      new MouseEvent('mouseover', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    );
    fixture.detectChanges();
    list.remove();
    expect(
      mockAutomationService.getListOfElementsByTagAndClasses
    ).toHaveBeenCalled();
  });

  it("should not calculate list of buttons if mouseover didn't trigger inside chosen block", async () => {
    const document = fixture.nativeElement.ownerDocument;

    let list = document.createElement('ul');
    for (let i = 0; i < 5; i++) {
      let listItem = document.createElement('li');
      listItem.appendChild(document.createElement('button'));
      list.appendChild(listItem);
    }

    document.body.appendChild(list);

    component.ngAfterViewInit();
    fixture.detectChanges();

    list.querySelector('button').dispatchEvent(
      new MouseEvent('mouseover', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    );
    fixture.detectChanges();
    list.remove();
    expect(
      mockAutomationService.getListOfElementsByTagAndClasses
    ).not.toHaveBeenCalled();
  });

  describe('if mouseover triggered inside chosen block and the there is list of buttons', () => {
    let list: HTMLElement;

    beforeEach(() => {
      const document = fixture.nativeElement.ownerDocument;
      list = document.createElement('ul');

      for (let i = 0; i < 5; i++) {
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        listItem.classList.add('automation-block-clicked');
        listItem.classList.add('automation-element-highlighter');
        listItem.appendChild(button);
        list.appendChild(listItem);

        component.elementsList.push(listItem);
        component.highlightedElements.push(button);
      }

      document.body.appendChild(list);

      list?.querySelector('button')?.dispatchEvent(
        new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
    });

    it('should add class to the list of buttons', async () => {
      await fixture.whenStable();
      fixture.detectChanges();
      expect(mockAutomationService.addClassNameToList).toHaveBeenCalled();
    });

    it('should show button Run bot', async () => {
      await fixture.whenStable();
      fixture.detectChanges();
      const hostElement: DebugElement = fixture.debugElement;
      expect(
        hostElement.query(By.css('.btn-primary'))?.nativeElement.textContent
      ).toContain('Run bot');
    });

    afterEach(() => {
      list.remove();
    });
  });

  describe('if button run bot is clicked', () => {
    let list: HTMLElement;

    beforeEach(() => {
      const document = fixture.nativeElement.ownerDocument;
      list = document.createElement('ul');

      for (let i = 0; i < 5; i++) {
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        listItem.classList.add('automation-block-clicked');
        listItem.classList.add('automation-element-highlighter');
        listItem.appendChild(button);
        list.appendChild(listItem);

        component.elementsList.push(listItem);
        component.highlightedElements.push(button);
      }

      document.body.appendChild(list);

      list?.querySelector('button')?.dispatchEvent(
        new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
    });

    it('should click all buttons', async () => {
      let clickNumber = 0;
      component.highlightedElements.forEach((button) => {
        button.addEventListener('click', () => {
          clickNumber++;
        });
      });
      await fixture.whenStable();
      component.runBot();
      fixture.detectChanges();
      expect(clickNumber === component.highlightedElements.length).toBeTruthy();
    });

    it('should show button Start from beginning', async () => {
      component.runBot();

      await fixture.whenStable();
      fixture.detectChanges();

      const hostElement: DebugElement = fixture.debugElement;
      expect(
        hostElement.query(By.css('.btn-primary')).nativeElement.textContent
      ).toContain('Start from beginning');
    });

    afterEach(() => {
      list.remove();
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
