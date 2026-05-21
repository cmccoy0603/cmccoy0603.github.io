import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';

@Component({
  selector: 'app-process-of-elimination-modal-body',
  standalone: true,
  templateUrl: './process-of-elimination-modal-body.html',
  styleUrl: './process-of-elimination-modal-body.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessOfEliminationModalBody {
  game = input.required<PortfolioGameDTO>();
}