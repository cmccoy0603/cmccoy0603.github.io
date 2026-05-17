import { ChangeDetectionStrategy, Component, computed, ElementRef, Signal, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioItem } from './portfolio-item/portfolio-item';
import { PortfolioGameDTO } from '../../models/portfolio-game.dto';

@Component({
  selector: 'app-portfolio-games',
  templateUrl: './portfolio-games.html',
  styleUrl: './portfolio-games.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(wheel)': 'onSectionWheel($event)'
  },
  imports: [
    CommonModule,
    PortfolioItem
  ]
})
export class PortfolioGamesComponent {
  protected readonly currentGameIndex = signal(0);
  protected readonly transitionProgress = signal(0);
  protected readonly gameProgressById = signal<Record<number, number>>({});
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
  
  private readonly isItemFullyExpanded = signal(false);
  private readonly isItemAtMinima = signal(true);
  private transitionScrollAmount = 0;
  private transitionDirection: 'up' | 'down' | null = null;
  private readonly transitionMaxScroll = 500; // pixels to scroll for next game

  currentGame: Signal<PortfolioGameDTO> = computed(() => this.portfolioGames()[this.currentGameIndex()]);
  currentGameProgress: Signal<number> = computed(() => {
    const game = this.currentGame();
    return this.gameProgressById()[game.id] ?? 0;
  });
  currentGameAtMinima = computed(() => this.currentGameProgress() <= 0);
  currentGameFullyExpanded = computed(() => this.currentGameProgress() >= 1);

  // Snap / global wheel bookkeeping
  private isSnapping = false;
  private snapTimeoutId: any = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Capture wheel on window so scrolls starting outside the section can be handled.
    window.addEventListener('wheel', this.globalWheelHandler, { passive: false, capture: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('wheel', this.globalWheelHandler, { capture: true } as any);
    if (this.snapTimeoutId) {
      clearTimeout(this.snapTimeoutId);
      this.snapTimeoutId = null;
    }
  }

  private globalWheelHandler = (evt: WheelEvent) => this.globalWheel(evt);

  private globalWheel(event: WheelEvent) {
    // If currently snapping to center, swallow wheel to avoid interrupting animation.
    if (this.isSnapping) {
      event.preventDefault();
      return;
    }

    // If portfolio section is not centered but is partially visible, snap it into place and
    // cancel the original wheel so the page doesn't continue scrolling past the section.
    const rect = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();
    const centerDistance = Math.abs((rect.top + rect.bottom) / 2 - window.innerHeight / 2);
    const isPartiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    const isCenteredEnough = centerDistance < 8;
    const isScrollingDown = event.deltaY > 0;
    const isScrollingUp = event.deltaY < 0;
    const isLastGame = this.currentGameIndex() === this.portfolioGames().length - 1;
    const isFirstGame = this.currentGameIndex() === 0;
    const canExitDown = isScrollingDown && this.currentGameFullyExpanded() && isLastGame;
    const canExitUp = isScrollingUp && this.currentGameAtMinima() && isFirstGame;

    if (canExitDown || canExitUp) {
      this.resetTransition();
      return;
    }

    if (isPartiallyVisible && !isCenteredEnough) {
      event.preventDefault();
      event.stopImmediatePropagation?.();
      this.snapSectionToCenter();
      return;
    }

    if (!isPartiallyVisible) {
      return;
    }

    const eventTarget = event.target;
    const isEventInsideSection = eventTarget instanceof Node && this.elementRef.nativeElement.contains(eventTarget);
    if (!isEventInsideSection) {
      event.preventDefault();
      event.stopImmediatePropagation?.();
      this.onSectionWheel(event);
    }
  }

  private snapSectionToCenter() {
    const el = this.elementRef.nativeElement as HTMLElement;
    this.isSnapping = true;
    // Smoothly bring the section into center of the viewport.
    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch {
      // Fallback for environments where options not supported.
      el.scrollIntoView();
    }

    if (this.snapTimeoutId) {
      clearTimeout(this.snapTimeoutId);
    }
    // Allow some time for smooth scroll to complete before restoring wheel handling.
    this.snapTimeoutId = setTimeout(() => {
      this.isSnapping = false;
      this.snapTimeoutId = null;
    }, 450);
  }

  onItemProgressChanged(progress: number) {
    const game = this.currentGame();
    this.gameProgressById.update(current => ({
      ...current,
      [game.id]: progress,
    }));
  }

  onSectionWheel(event: WheelEvent) {
    if (!this.isSectionInView()) {
      this.resetTransition();
      return;
    }

    const isScrollingDown = event.deltaY > 0;
    const isScrollingUp = event.deltaY < 0;

    if (!isScrollingDown && !isScrollingUp) {
      return;
    }

    const games = this.portfolioGames();
    const isLastGame = this.currentGameIndex() === games.length - 1;
    const isFirstGame = this.currentGameIndex() === 0;
    const itemIsFullyExpanded = this.currentGameFullyExpanded();
    const itemIsAtMinima = this.currentGameAtMinima();

    // Allow page exit only at configured boundaries.
    if (isScrollingDown && itemIsFullyExpanded && isLastGame) {
      this.resetTransition();
      return;
    }

    if (isScrollingUp && itemIsAtMinima && isFirstGame) {
      this.resetTransition();
      return;
    }

    event.preventDefault();

    // Transition only at child boundary states.
    const canTransitionDown = isScrollingDown && itemIsFullyExpanded && !isLastGame;
    const canTransitionUp = isScrollingUp && itemIsAtMinima && !isFirstGame;

    if (!canTransitionDown && !canTransitionUp) {
      this.resetTransition();
      return;
    }

    this.updateTransitionProgress(isScrollingDown ? 'down' : 'up', Math.abs(event.deltaY));
  }

  private updateTransitionProgress(direction: 'up' | 'down', deltaAmount: number) {
    if (this.transitionDirection && this.transitionDirection !== direction) {
      this.transitionScrollAmount = 0;
    }

    this.transitionDirection = direction;
    this.transitionScrollAmount += deltaAmount;
    this.transitionScrollAmount = Math.min(this.transitionScrollAmount, this.transitionMaxScroll);

    const progress = this.transitionScrollAmount / this.transitionMaxScroll;
    this.transitionProgress.set(progress);

    if (progress < 1) {
      return;
    }

    if (direction === 'down') {
      this.nextGame();
    } else {
      this.previousGame();
    }

    this.resetTransition();
  }

  private isSectionInView() {
    const container = this.elementRef.nativeElement as HTMLElement;
    const rect = container.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  private resetTransition() {
    this.transitionScrollAmount = 0;
    this.transitionDirection = null;
    this.transitionProgress.set(0);
  }

  previousGame() {
    this.currentGameIndex.update(index => Math.max(index - 1, 0));
  }

  nextGame() {
    const games = this.portfolioGames();
    this.currentGameIndex.update(index => Math.min(index + 1, games.length - 1));
  }
}
