import {
  Component,
  ElementRef,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { ITodo } from '../todos/types/todo.interface';
import { CommonModule } from '@angular/common';
import { TodosService } from '../todos/services/todos.service';

@Component({
  selector: 'app-todos-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit, OnChanges {
  // @Input
  todo = input.required<ITodo>();
  // @Input
  isEditing = input.required<boolean>();
  // @Output
  setEditingId = output<string | null>();
  // @ViewChild
  textInput = viewChild<ElementRef>('textInput');

  todosService = inject(TodosService);

  editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.todo().text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput()?.nativeElement.focus();
      }, 0);
    }
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  cancelEditing(): void {
    this.editingText = this.todo().text;
    this.setEditingId.emit(null);
  }

  changeTodo(): void {
    this.todosService.changeTodo(this.todo().id, this.editingText);
    this.setEditingId.emit(null);
  }

  setTodoInEditMode(): void {
    this.setEditingId.emit(this.todo().id);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todo().id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todo().id);
  }
}
