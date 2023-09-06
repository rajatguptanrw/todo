import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { Todo } from './todo.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoList: Array<Todo> = [];
  constructor(private todoService: TodoService,
    public router: Router) {

  }


  ngOnInit() {
    this.getAllTodos();
  }

  //observer subscriber pattern
  getAllTodos() {
    this.todoService.getAllTodo().subscribe((res: any) => {
      console.log(res);
      this.todoList = res as Array<Todo>;
    })
  }


  onUpdateClick(todo: Todo) {
    this.router.navigate(['/todo/update-todo/' + todo.id])
  }

  onDeleteClick(todo: Todo) {
    this.todoService.deleteTodo(todo.id).subscribe(res => {
      if (res !== null && res !== undefined) {
        this.getAllTodos();
      }
    })
  }
  onMarkAsDone(todo: any) {
    todo.isDone = true;
    this.todoService.updateTodoById(todo.id).subscribe(res => {
      if (res !== null && res !== undefined) {
        this.getAllTodos();
      }
    })
  }


}
