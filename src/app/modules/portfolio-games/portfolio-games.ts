import { ChangeDetectionStrategy, Component, computed, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioItem } from './portfolio-item/portfolio-item';
import { PortfolioGameDTO } from '../../models/portfolio-game.dto';

@Component({
  selector: 'app-portfolio-games',
  templateUrl: './portfolio-games.html',
  styleUrl: './portfolio-games.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PortfolioItem
  ]
})
export class PortfolioGamesComponent {
  protected readonly currentGameIndex = signal(0);
  protected readonly portfolioGames = signal<PortfolioGameDTO[]>([
    { 
      id: 1, 
      title: 'Game 1',
      description: 'An exciting game with unique mechanics and engaging gameplay.'
    },
    { 
      id: 2, 
      title: 'Game 2',
      description: 'A challenging puzzle game that tests your problem-solving skills.'
    },
    { 
      id: 3, 
      title: 'Game 3',
      description: 'An action-packed adventure game with immersive storytelling.'
    }
  ]);
  
  currentGame: Signal<PortfolioGameDTO> = computed(() => this.portfolioGames()[this.currentGameIndex()])

  previousGame() {
    const games = this.portfolioGames();
    this.currentGameIndex.update(index => (index - 1 + games.length) % games.length);
  }

  nextGame() {
    const games = this.portfolioGames();
    this.currentGameIndex.update(index => (index + 1) % games.length);
  }
}
