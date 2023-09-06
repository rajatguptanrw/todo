import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from './layout/todo/todo.interface';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all todos', () => {
    const dummyTodos: Todo[] = [
      { id: '1', title: 'Todo 1', description: 'Lorem ipsum', isDone: false },
      { id: '2', title: 'Todo 2', description: 'Lorem ipsum', isDone: false }
    ];

    service.getAllTodo().subscribe((todos: any) => {
      expect(todos).toEqual(dummyTodos);
    });

    const req = httpMock.expectOne('http://localhost:5000/data/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTodos);
  });

  it('should add a new todo', () => {
    const dummyTodo: Todo = { id: '3', title: 'New Todo', description: 'Lorem ipsum', isDone: false  };
    service.addTodo(dummyTodo).subscribe((response: any) => {
      expect(response).toEqual(dummyTodo);
    });

    const req = httpMock.expectOne('http://localhost:5000/data/');
    expect(req.request.method).toBe('POST');
    req.flush(dummyTodo);
  });

  it('should update a todo', () => {
    const updateTodo: Todo = { id: '1', title: 'Updated Todo', description: 'Lorem ipsum', isDone: false };

    service.updateTodoById(updateTodo).subscribe((response: any) => {
      expect(response).toEqual(updateTodo);
    });

    const req = httpMock.expectOne('http://localhost:5000/data/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(updateTodo);
  });

  it('should retrieve a todo by id', () => {
    const todoId = '1';
    const dummyTodo: Todo = { id: todoId, title: 'Todo 1', description: 'Lorem ipsum ', isDone: false };

    service.getTodoById(todoId).subscribe((todo: any) => {
      expect(todo).toEqual(dummyTodo);
    });

    const req = httpMock.expectOne(`http://localhost:5000/data/${todoId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTodo);
  });

  it('should delete a todo by id', () => {
    const todoIdToDelete = '1';

    service.deleteTodo(todoIdToDelete).subscribe((response: any) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:5000/data/${todoIdToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
