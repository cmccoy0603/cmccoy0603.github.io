import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';

@Component({
  selector: 'app-twilight-train-modal-body',
  standalone: true,
  templateUrl: './twilight-train-modal-body.html',
  styleUrl: './twilight-train-modal-body.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwilightTrainModalBody {
  game = input.required<PortfolioGameDTO>();
}