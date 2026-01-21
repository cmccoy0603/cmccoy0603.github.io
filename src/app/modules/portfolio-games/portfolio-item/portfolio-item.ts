import { Component, input, Signal } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';

@Component({
  selector: 'app-portfolio-item',
  imports: [],
  templateUrl: './portfolio-item.html',
  styleUrl: './portfolio-item.scss'
})
export class PortfolioItem {
  currentGame = input.required<PortfolioGameDTO>()
}
