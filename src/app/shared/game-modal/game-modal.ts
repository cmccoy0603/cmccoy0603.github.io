import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-game-modal',
  imports: [],
  templateUrl: './game-modal.html',
  styleUrl: './game-modal.scss'
})
export class GameModal {
  isOpen = input(false);
  title = input('');
  description = input('');
  closed = output<void>();

  close() {
    this.closed.emit();
  }
}
