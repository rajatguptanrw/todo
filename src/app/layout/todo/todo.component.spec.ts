import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { TodoService } from 'src/app/todo.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockTodoService = jasmine.createSpyObj('TodoService', ['getAllTodo', 'deleteTodo']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: TodoService, useValue: mockTodoService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all todos on ngOnInit', () => {
    const mockTodoList = <any>[{ id: 1, title: 'Test Todo' }];
    mockTodoService.getAllTodo.and.returnValue(of(mockTodoList));
    fixture.detectChanges();
    expect(component.todoList).toEqual(mockTodoList);
  });

  it('should navigate to the update todo route', () => {
    const todoId = '1';
    const mockTodo = <any>{ id: todoId, title: 'Test Todo' };
    component.onUpdateClick(mockTodo);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should delete a todo item and get all todos', () => {
    const deleteTodo = <any>{ id: 1, name: 'Test Todo' };
    mockTodoService.deleteTodo.and.returnValue(of({}));
    spyOn(component, 'getAllTodos');
    component.onDeleteClick(deleteTodo);
    expect(mockTodoService.deleteTodo).toHaveBeenCalledWith(deleteTodo.id);
    expect(component.getAllTodos).toHaveBeenCalled();
  });

});
