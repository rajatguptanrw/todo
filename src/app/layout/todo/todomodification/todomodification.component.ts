  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { Todo } from '../todo.interface';
  import { TodoService } from 'src/app/todo.service';
  import { v4 as uuidv4 } from 'uuid';

  @Component({
    selector: 'app-todomodification',
    templateUrl: './todomodification.component.html',
    styleUrls: ['./todomodification.component.scss']
  })
  export class TodomodificationComponent implements OnInit {

    id: any = '';
    todo: Todo = {
      id: '',
      title: '',
      description: ''
    }
    constructor(private route: ActivatedRoute,
      public todoService: TodoService) {
    }

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.todoService.getTodoById(this.id).subscribe(res => {
          this.todo = res as Todo;
        });
      }
    }

    onSubmitClick() {
      if (this.todo.title && this.todo.description) {
        if (this.id) {
          this.todoService.updateTodoById(this.todo).subscribe(res => {
            console.log(res);
            this.resetTodo();
          })
        }
        else {
          this.todo.id = uuidv4();
          this.todoService.addTodo(this.todo).subscribe(res => {
            this.resetTodo();
          })
        }
      }
    }

    resetTodo() {
      this.todo = {
        id: '',
        title: '',
        description: ''
      };
    }

  }
