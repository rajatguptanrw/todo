import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  constructor(public router: Router) {

  }


  onTaskClick() {
    this.router.navigate(['/todo']);
  }

  onAddTodoClick() {
    this.router.navigate(['/todo/add-todo']);
  }
}
