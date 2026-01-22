import { ChangeDetectionStrategy, Component, computed, Signal, signal, ElementRef } from '@angular/core';
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
  protected readonly transitionProgress = signal(0);
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
  
  private isItemFullyExpanded = false;
  private isItemAtMinima = false
  private transitionScrollAmount = 0;
  private transitionDirection: 'up' | 'down' | null = null;
  private readonly transitionMaxScroll = 500; // pixels to scroll for next game
  private inSection = false;

  currentGame: Signal<PortfolioGameDTO> = computed(() => this.portfolioGames()[this.currentGameIndex()])

  constructor(private elementRef: ElementRef) {}

  onItemDoneScrolling(isDone: number) {
    if(isDone == 1) {
      this.isItemFullyExpanded = true;
      this.isItemAtMinima = false;
    } else if (isDone == -1) {
      this.isItemAtMinima = true
      this.isItemFullyExpanded = false;
    } else {
      this.isItemFullyExpanded = false;
      this.isItemAtMinima = false;
    }
  }

  onTransitionScroll(event: WheelEvent) {
    // Reset progress bar if not in transition state
    if (!this.isItemFullyExpanded && !this.isItemAtMinima) {
      this.transitionProgress.set(0);
      return;
    }

    const games = this.portfolioGames();
    const isLastGame = this.currentGameIndex() === games.length - 1;
    const isFirstGame = this.currentGameIndex() === 0;
    const isScrollingDown = event.deltaY > 0;
    const isScrollingUp = event.deltaY < 0;

    // Allow transitions if not at boundaries
    const canScrollDown = isScrollingDown && !isLastGame;
    const canScrollUp = isScrollingUp && !isFirstGame;

    if (!canScrollDown && !canScrollUp) {
      this.transitionProgress.set(0);
      return;
    }

    event.preventDefault();
    
    // Determine scroll direction
    const newDirection = isScrollingDown ? 'down' : 'up';
    
    // Reset if direction changes
    if (this.transitionDirection && this.transitionDirection !== newDirection) {
      this.transitionScrollAmount = 0;
    }
    
    this.transitionDirection = newDirection;
    
    // Add absolute value of scroll delta
    this.transitionScrollAmount += Math.abs(event.deltaY);
    this.transitionScrollAmount = Math.min(this.transitionScrollAmount, this.transitionMaxScroll);
    
    const progress = this.transitionScrollAmount / this.transitionMaxScroll;
    this.transitionProgress.set(progress);

    // Transition to next/previous game when threshold is reached
    if (progress >= 1) {
      if (isScrollingDown && !isLastGame) {
        this.nextGame();
      } else if (isScrollingUp && !isFirstGame) {
        this.previousGame();
      }
      this.transitionScrollAmount = 0;
      this.transitionDirection = null;
      this.transitionProgress.set(0);
    }
  }

  previousGame() {
    const games = this.portfolioGames();
    this.currentGameIndex.update(index => (index - 1 + games.length) % games.length);
  }

  nextGame() {
    const games = this.portfolioGames();
    this.currentGameIndex.update(index => (index + 1) % games.length);
  }
}
