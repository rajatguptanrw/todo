import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodomodificationComponent } from './todomodification.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TodoService } from 'src/app/todo.service';
import { of } from 'rxjs';

describe('TodomodificationComponent', () => {
  let component: TodomodificationComponent;
  let fixture: ComponentFixture<TodomodificationComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    mockTodoService = jasmine.createSpyObj('TodoService', ['getTodoById', 'updateTodoById', 'addTodo']);

    TestBed.configureTestingModule({
      declarations: [TodomodificationComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(TodomodificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should reset the todo variable', () => {
    component.resetTodo();
    expect(component.todo.title).toEqual('');
    expect(component.todo.id).toEqual('');
    expect(component.todo.description).toEqual('');
  });
});
