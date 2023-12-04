import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationActionsComponent } from './automation-actions.component';

describe('AutomationActionsComponent', () => {
  let component: AutomationActionsComponent;
  let fixture: ComponentFixture<AutomationActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomationActionsComponent]
    });
    fixture = TestBed.createComponent(AutomationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
