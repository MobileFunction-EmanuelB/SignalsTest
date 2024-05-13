import { Injectable, inject, signal } from '@angular/core';
import { ITodo } from '../types/todo.interface';
import { TodosFilter } from '../types/filter.enum';
import { SignalsExample } from '../../signals.example';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSig = signal<ITodo[]>([]);
  todosFilterSig = signal(TodosFilter.All);

  signalsExample = inject(SignalsExample);

  constructor() {
    this.signalsExample.printSignals();
  }

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

  changeTodo(id: string, text: string): void {
    // Update todos signal by changing todo text
    this.todosSig.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  }

  changeFilter(filter: TodosFilter): void {
    this.todosFilterSig.set(filter);
  }

  removeTodo(id: string): void {
    // Update todos signal by filtering todo id
    this.todosSig.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  toggleTodo(id: string): void {
    // Update todos signal by toggling todo completion status
    this.todosSig.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  toggleAll(isCompleted: boolean): void {
    this.todosSig.update((todos) =>
      todos.map((todo) => ({ ...todo, isCompleted: !isCompleted }))
    );
  }
}
