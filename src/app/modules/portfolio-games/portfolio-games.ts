import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModal } from '../../shared/game-modal/game-modal';
import { PortfolioGameDTO, PortfolioGameSection } from '../../models/portfolio-game.dto';
import { portfolioGames } from '../../content/games-content';

type PortfolioSection = {
  id: PortfolioGameSection;
  title: string;
  description: string;
};

const SECTIONS: PortfolioSection[] = [
  {
    id: 'school-projects',
    title: 'School Projects',
    description: 'Games made as part of a class.',
  },
  {
    id: 'game-jam',
    title: 'Game Jam Games',
    description: 'All the game jam games I\'ve made. Most are playable on the browser',
  },
];

@Component({
  selector: 'app-portfolio-games',
  standalone: true,
  templateUrl: './portfolio-games.html',
  styleUrl: './portfolio-games.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, GameModal]
})
export class PortfolioGamesComponent {
  protected readonly sections = SECTIONS;
  protected readonly portfolioGames = signal(portfolioGames);
  protected readonly selectedGame = signal<PortfolioGameDTO | null>(null);

  protected readonly hasSelection = computed(() => this.selectedGame() !== null);

  protected gamesForSection(section: PortfolioGameSection) {
    return this.portfolioGames().filter(game => game.section === section);
  }

  protected openGame(game: PortfolioGameDTO) {
    this.selectedGame.set(game);
  }

  protected closeGame() {
    this.selectedGame.set(null);
  }

  protected trackByGameId(_: number, game: PortfolioGameDTO) {
    return game.id;
  }
}