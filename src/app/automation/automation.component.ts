import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  AfterContentChecked,
  OnDestroy,
} from '@angular/core';
import { AutomationService } from './automation.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AutomationComponent implements AfterContentChecked {
  items: HTMLElement[] = [];
  step: number = 1;
  action: string = '';
  overlayIsVisible: boolean = false;

  constructor(
    private automationService: AutomationService,
    private changeDetector: ChangeDetectorRef
  ) {}

  goToStep = ($event: Event, step: number) => {
    $event.preventDefault();
    if (step > this.step) return;
    this.step = step;
    if (step === 1) {
      this.onReset();
    } else if (step === 2) {
    }
  };

  onSaveItems = (items: HTMLElement[]) => {
    this.items = items;
    this.step = 2;
  };

  onChooseAnAction = (action: string) => {
    this.step = 3;
    this.action = action;
  };

  onReset = () => {
    this.step = 1;
    this.action = '';
    this.automationService.removeClassNameFromList(
      this.items,
      'automation-block-highlighted'
    );
    this.automationService.removeClassNameFromList(
      this.items,
      'automation-block-clicked'
    );
    this.items = [];
  };

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
