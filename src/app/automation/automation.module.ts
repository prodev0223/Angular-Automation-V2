import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AutomationComponent } from "./automation.component";
import { AutomationForLoopComponent } from "./automation-for-loop/automation-for-loop.component";
import { AutomationActionsComponent } from "./automation-actions/automation-actions.component";
import { AutomationActionsButtonComponent } from "./automation-actions-button/automation-actions-button.component";
import { AutomationActionsInputComponent } from "./automation-actions-input/automation-actions-input.component";
import { AutomationService } from "./automation.service";


@NgModule({
  declarations: [
    AutomationComponent,
    AutomationForLoopComponent,
    AutomationActionsComponent,
    AutomationActionsButtonComponent,
    AutomationActionsInputComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [AutomationService],
  exports: [AutomationComponent],
  bootstrap: [AutomationComponent],
})
export class AutomationModule {}
