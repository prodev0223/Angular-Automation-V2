import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationActionsButtonComponent } from './automation-actions-button.component';

describe('AutomationActionsButtonComponent', () => {
  let component: AutomationActionsButtonComponent;
  let fixture: ComponentFixture<AutomationActionsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomationActionsButtonComponent],
    });
    fixture = TestBed.createComponent(AutomationActionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
