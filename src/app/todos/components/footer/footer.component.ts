import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodosFilter } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  todosService = inject(TodosService);
  // current filter value signal
  filterSig = this.todosService.todosFilterSig;
  // enum for filters
  filterEnum = TodosFilter;
  // computed signal for active count
  activeCountSig = computed(() => {
    return this.todosService.todosSig().filter((todo) => !todo.isCompleted)
      .length;
  });
  // computed signal if footer should be displayed (only if there is at least one todo)
  displayFooterSig = computed(() => {
    return this.todosService.todosSig().length > 0;
  });
  // computed signal for text of items left
  itemsLeftTextSig = computed(() => {
    return ` item${this.activeCountSig() === 1 ? '' : 's'} left`;
  });

  changeFilter(event: Event, filter: TodosFilter): void {
    event.preventDefault();
    this.todosService.changeFilter(filter);
  }
}
