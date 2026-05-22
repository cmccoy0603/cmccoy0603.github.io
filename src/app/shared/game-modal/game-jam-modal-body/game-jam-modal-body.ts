import { Component, input } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';
import { IframeStartWrapper } from '../iframe-start-wrapper/iframe-start-wrapper';

@Component({
  selector: 'app-game-jam-modal-body',
  imports: [IframeStartWrapper],
  templateUrl: './game-jam-modal-body.html',
  styleUrl: './game-jam-modal-body.scss'
})
export class GameJamModalBody {
  game = input.required<PortfolioGameDTO>();
}