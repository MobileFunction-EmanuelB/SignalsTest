import { Component, OnInit, input, output } from '@angular/core';
import { ITodo } from '../todos/types/todo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todo = input.required<ITodo>();
  isEditing = input.required<boolean>();
  setEditingId = output<string | null>();

  editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.todo().text;
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  changeTodo(): void {
    this.setEditingId.emit(null);
  }

  setTodoInEditMode(): void {
    this.setEditingId.emit(this.todo().id);
  }
}
