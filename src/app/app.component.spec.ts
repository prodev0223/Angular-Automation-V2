import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { TodoAppModule } from './todo-app/todo-app.module';
import { AutomationModule } from './automation/automation.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<TodoAppModule>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [TodoAppModule, AutomationModule],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
