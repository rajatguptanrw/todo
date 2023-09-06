import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodomodificationComponent } from './todomodification/todomodification.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent
  },
  {
    path: 'add-todo',
    component: TodomodificationComponent
  },
  {
    path: 'update-todo/:id',
    component: TodomodificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
