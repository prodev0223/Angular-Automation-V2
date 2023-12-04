import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AutomationModule } from "./automation/automation.module";

import { AppComponent } from "./app.component";
import { TodoAppModule } from "./todo-app/todo-app.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AutomationModule, TodoAppModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
