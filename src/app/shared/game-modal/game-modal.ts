import { Component, input, output } from '@angular/core';
import { PortfolioGameDTO } from '../../models/portfolio-game.dto';
import { GenericGameModalBody } from './generic-game-modal-body/generic-game-modal-body';
import { ProcessOfEliminationModalBody } from './process-of-elimination-modal-body/process-of-elimination-modal-body';
import { TwilightTrainModalBody } from './twilight-train-modal-body/twilight-train-modal-body';
import { ThreedChromoTwistModalBody } from './threed-chromo-twist-modal-body/threed-chromo-twist-modal-body';
import { GameJamModalBody } from './game-jam-modal-body/game-jam-modal-body';

@Component({
  selector: 'app-game-modal',
  standalone: true,
  imports: [GenericGameModalBody, ProcessOfEliminationModalBody, TwilightTrainModalBody, ThreedChromoTwistModalBody, GameJamModalBody],
  templateUrl: './game-modal.html',
  styleUrl: './game-modal.scss'
})
export class GameModal {
  isOpen = input(false);
  game = input.required<PortfolioGameDTO>();
  closed = output<void>();

  blockPageScroll(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    (event as Event & { stopImmediatePropagation?: () => void }).stopImmediatePropagation?.();
  }

  stopEvent(event: Event) {
    event.stopPropagation();
  }

  close() {
    this.closed.emit();
  }
}
