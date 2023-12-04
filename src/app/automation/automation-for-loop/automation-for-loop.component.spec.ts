import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationForLoopComponent } from './automation-for-loop.component';

describe('AutomationForLoopComponent', () => {
  let component: AutomationForLoopComponent;
  let fixture: ComponentFixture<AutomationForLoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomationForLoopComponent]
    });
    fixture = TestBed.createComponent(AutomationForLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
