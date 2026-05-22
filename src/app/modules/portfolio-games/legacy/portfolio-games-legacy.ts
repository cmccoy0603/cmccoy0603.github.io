import { ChangeDetectionStrategy, Component, computed, ElementRef, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioItemLegacy } from './portfolio-item-legacy';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';
import { portfolioGames } from '../../../content/games-content';

@Component({
  selector: 'app-portfolio-games-legacy',
  standalone: true,
  templateUrl: './portfolio-games-legacy.html',
  styleUrl: './portfolio-games-legacy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(wheel)': 'onSectionWheel($event)'
  },
  imports: [CommonModule, PortfolioItemLegacy]
})
export class PortfolioGamesLegacyComponent implements OnInit, OnDestroy {
  protected readonly currentGameIndex = signal(0);
  protected readonly transitionProgress = signal(0);
  protected readonly gameProgressById = signal<Record<number, number>>({});
  protected readonly portfolioGames = signal(portfolioGames);

  private transitionScrollAmount = 0;
  private transitionDirection: 'up' | 'down' | null = null;
  private readonly transitionMaxScroll = 4;

  currentGame: Signal<PortfolioGameDTO> = computed(() => this.portfolioGames()[this.currentGameIndex()]);
  currentGameProgress: Signal<number> = computed(() => {
    const game = this.currentGame();
    return this.gameProgressById()[game.id] ?? 0;
  });
  currentGameAtMinima = computed(() => this.currentGameProgress() <= 0);
  currentGameFullyExpanded = computed(() => this.currentGameProgress() >= 1);

  private isSnapping = false;
  private snapTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    window.addEventListener('wheel', this.globalWheelHandler, { passive: false, capture: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('wheel', this.globalWheelHandler, { capture: true } as AddEventListenerOptions);
    if (this.snapTimeoutId) {
      clearTimeout(this.snapTimeoutId);
      this.snapTimeoutId = null;
    }
  }

  private globalWheelHandler = (evt: WheelEvent) => this.globalWheel(evt);

  private globalWheel(event: WheelEvent) {
    if (this.isSnapping) {
      event.preventDefault();
      return;
    }

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
    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch {
      el.scrollIntoView();
    }

    if (this.snapTimeoutId) {
      clearTimeout(this.snapTimeoutId);
    }
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

    if (isScrollingDown && itemIsFullyExpanded && isLastGame) {
      this.resetTransition();
      return;
    }

    if (isScrollingUp && itemIsAtMinima && isFirstGame) {
      this.resetTransition();
      return;
    }

    event.preventDefault();

    const canTransitionDown = isScrollingDown && itemIsFullyExpanded && !isLastGame;
    const canTransitionUp = isScrollingUp && itemIsAtMinima && !isFirstGame;

    if (!canTransitionDown && !canTransitionUp) {
      this.resetTransition();
      return;
    }

    this.updateTransitionProgress(isScrollingDown ? 'down' : 'up', 1);
  }

  private updateTransitionProgress(direction: 'up' | 'down', ticks: number) {
    if (this.transitionDirection && this.transitionDirection !== direction) {
      this.transitionScrollAmount = 0;
    }

    this.transitionDirection = direction;
    this.transitionScrollAmount += ticks;
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

  scrollToPreviousSection() {
    this.resetTransition();
    this.scrollToSibling('up');
  }

  scrollToNextSection() {
    this.resetTransition();
    this.scrollToSibling('down');
  }

  private scrollToSibling(direction: 'up' | 'down') {
    const el = this.elementRef.nativeElement as HTMLElement;
    const sibling = direction === 'up' ? el.previousElementSibling : el.nextElementSibling;
    if (sibling && sibling instanceof HTMLElement) {
      try {
        sibling.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch {
        sibling.scrollIntoView();
      }
      return;
    }

    if (direction === 'up') {
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch { window.scrollTo(0, 0); }
    } else {
      try { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); } catch { window.scrollTo(0, document.body.scrollHeight); }
    }
  }

  previousGame() {
    this.currentGameIndex.update(index => Math.max(index - 1, 0));
  }

  nextGame() {
    const games = this.portfolioGames();
    this.currentGameIndex.update(index => Math.min(index + 1, games.length - 1));
  }
}