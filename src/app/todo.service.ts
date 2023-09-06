import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from './layout/todo/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'http://localhost:5000/data/';
  static instance: any;


  constructor(private http: HttpClient) { }

  getAllTodo() {
    return this.http.get(this.url);
  }

  addTodo(todo: Todo) {
    return this.http.post(this.url, todo);
  }

  updateTodoById(todo: Todo) {
    return this.http.patch(this.url + todo.id, todo);
  }

  getTodoById(id: string) {
    return this.http.get(this.url + id);
  }

  deleteTodo(id: string) {
    return this.http.delete(this.url + id);
  }
}
