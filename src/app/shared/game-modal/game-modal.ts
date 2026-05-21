import { Component, input, output } from '@angular/core';
import { PortfolioGameDTO } from '../../models/portfolio-game.dto';
import { GenericGameModalBody } from './generic-game-modal-body/generic-game-modal-body';
import { ProcessOfEliminationModalBody } from './process-of-elimination-modal-body/process-of-elimination-modal-body';
import { TwilightTrainModalBody } from './twilight-train-modal-body/twilight-train-modal-body';
import { IframeStartWrapper } from './iframe-start-wrapper/iframe-start-wrapper';

@Component({
  selector: 'app-game-modal',
  standalone: true,
  imports: [GenericGameModalBody, ProcessOfEliminationModalBody, TwilightTrainModalBody, IframeStartWrapper],
  templateUrl: './game-modal.html',
  styleUrl: './game-modal.scss'
})
export class GameModal {
  isOpen = input(false);
  game = input.required<PortfolioGameDTO>();
  closed = output<void>();

  onWheel(event: WheelEvent) {
    event.stopPropagation();
  }

  close() {
    this.closed.emit();
  }
}
