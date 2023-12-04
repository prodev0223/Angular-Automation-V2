import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AutomationModule } from '../automation.module';

import { AutomationActionsInputComponent } from './automation-actions-input.component';

describe('AutomationActionsInputComponent', () => {
  let component: AutomationActionsInputComponent;
  let fixture: ComponentFixture<AutomationActionsInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomationActionsInputComponent],
    });
    fixture = TestBed.createComponent(AutomationActionsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
