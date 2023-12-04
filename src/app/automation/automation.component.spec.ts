import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { AutomationComponent } from './automation.component';

@Component({ standalone: true, selector: 'automation-for-loop', template: '' })
class AutomationForLoopStubComponent {}

describe('AutomationComponent', () => {
  let component: AutomationComponent;
  let fixture: ComponentFixture<AutomationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomationComponent],
      imports: [AutomationForLoopStubComponent],
    });
    fixture = TestBed.createComponent(AutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
