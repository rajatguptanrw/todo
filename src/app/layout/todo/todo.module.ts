import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodomodificationComponent } from './todomodification/todomodification.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodoComponent,
    TodomodificationComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule
  ]
})
export class TodoModule { }
