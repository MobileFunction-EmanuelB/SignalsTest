import { Injectable, signal } from '@angular/core';
import { ITodo } from '../types/todo.interface';
import { TodosFilter } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSig = signal<ITodo[]>([]);
  todosFilterSig = signal<TodosFilter>(TodosFilter.All);

  addTodo(text: string): void {
    // New todo
    const newTodo = {
      id: Math.random().toString(16),
      text,
      isCompleted: false,
    };
    // Update todos signal by adding new todo
    this.todosSig.update((todos) => [...todos, newTodo]);
  }

  changeFilter(filter: TodosFilter): void {
    this.todosFilterSig.set(filter);
  }
}
