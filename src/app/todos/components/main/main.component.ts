import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { CommonModule, NgFor } from '@angular/common';
import { TodoComponent } from '../../../todo/todo.component';

@Component({
  selector: 'app-todos-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  todosService = inject(TodosService);
  editingId: string | null = null;
  // Displayed, computed signal that filters todos based on the current filter
  visibleTodos = computed(() => {
    return this.todosService.todosSig().filter((todo) => {
      switch (this.todosService.todosFilterSig()) {
        case 'all': {
          return true;
        }
        case 'active': {
          return !todo.isCompleted;
        }
        case 'completed': {
          return todo.isCompleted;
        }
        default: {
          return false;
        }
      }
    });
  });

  isAllTodosSelected = computed(() => {
    if (this.todosService.todosSig().length === 0) {
      return false;
    }
    return this.todosService.todosSig().every((todo) => todo.isCompleted);
  });

  noTodosClass = computed(() => {
    return this.todosService.todosSig().length === 0;
  });

  setEditingId(id: string | null): void {
    this.editingId = id;
  }

  toggleAllTodos(event: Event): void {
    const areAllTodosCompleted = this.isAllTodosSelected();
    this.todosService.toggleAll(areAllTodosCompleted);
  }
}
