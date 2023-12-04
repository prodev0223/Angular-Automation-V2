import { Component } from "@angular/core";

@Component({
  selector: "todo-app",
  templateUrl: "./todo-app.component.html",
  styleUrls: ["./todo-app.component.scss"],
})
export class TodoAppComponent {
  tasks = [
    {
      title: "task 1",
      completed: false,
    },
    {
      title: "task 2",
      completed: false,
    },
    {
      title: "task 3",
      completed: false,
    },
    {
      title: "task 4",
      completed: false,
    },
  ];

  completedTasks = [
    {
      title: "task 5",
      completed: false,
    },
    {
      title: "task 6",
      completed: false,
    },
    {
      title: "task 7",
      completed: false,
    },
    {
      title: "task 8",
      completed: false,
    },
  ];

  addTask(description: string) {
    this.tasks.push({
      title: description,
      completed: false,
    });
  }

  deleteTask(task: any) {
    let index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
