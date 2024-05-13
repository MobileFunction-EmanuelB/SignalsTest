import { Injectable, computed, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalsExample {
  // Simple signal with string value
  private simpleSignal = signal('Hello, World!');

  // Simple signal with object value
  private objectSignal = signal({ name: 'John', age: 30 });

  // Simple signal with array value
  private arraySignal = signal([1, 2, 3, 4, 5]);

  // Computed signal, based on 2 signals
  private filterCount = signal(20);
  private filterText = signal('Items left');

  private computedSignal = computed(() => {
    return `${this.filterCount()} ${this.filterText()}`;
  });

  public printSignals(): void {
    // Reactive context
    effect(() => {
      console.warn('filterCount =>', this.filterCount());
    });

    console.log('simpleSignal:', this.simpleSignal());
    console.log('');
    console.log('objectSignal:', this.objectSignal());
    console.log('');
    console.log('arraySignal:', this.arraySignal());
    console.log('');
    console.log('filterCount:', this.filterCount());
    console.log('filterText:', this.filterText());
    console.log('computedSignal:', this.computedSignal());
    console.log('');

    this.filterCount.update((f) => f + 5);

    console.log('computedSignal + 5:', this.computedSignal());
    console.log('');

    this.filterText.update((f) => f + '!!');

    console.log('computedSignal + !!:', this.computedSignal());
    console.log('');

    // Glitch free effect
    this.filterCount.update((f) => f + 5);
    this.filterCount.update((f) => f + 5);
    this.filterCount.update((f) => f + 5);
    this.filterCount.update((f) => f + 5);
    this.filterCount.update((f) => f + 5);
    this.filterCount.update((f) => f + 5);
    this.filterCount.update((f) => f + 5);
    this.filterCount.update((f) => f + 5); // <- change detection will be triggered only once
  }
}
