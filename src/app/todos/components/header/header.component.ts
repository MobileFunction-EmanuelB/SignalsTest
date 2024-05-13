import { Component, effect, inject, signal } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  todosService = inject(TodosService);
  text = signal('');

  constructor() {
    effect(() => {
      // Executed every time the text signal value changes
      console.log(`HeaderComponent effect: ${this.text()}`);
    });
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text.set(target.value);
  }

  addTodo(): void {
    if (this.text().trim().length === 0) {
      return;
    }

    this.todosService.addTodo(this.text());
    this.text.set('');
  }
}
