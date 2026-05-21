import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';

@Component({
  selector: 'app-generic-game-modal-body',
  standalone: true,
  templateUrl: './generic-game-modal-body.html',
  styleUrl: './generic-game-modal-body.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericGameModalBody {
  game = input.required<PortfolioGameDTO>();
}