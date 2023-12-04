import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { TodoAppComponent } from "./todo-app.component";

@NgModule({
  declarations: [TodoAppComponent],
  imports: [BrowserModule],

  exports: [TodoAppComponent],
  providers: [],
  bootstrap: [TodoAppComponent],
})
export class TodoAppModule {}
