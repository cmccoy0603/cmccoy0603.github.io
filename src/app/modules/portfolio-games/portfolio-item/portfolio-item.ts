import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, input, OnInit, output, signal } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';
import { GameModal } from "../../../shared/game-modal/game-modal";

export type PortfolioItemScrollState = 'min' | 'mid' | 'max';

const EXPAND_TICKS = 4;

@Component({
  selector: 'app-portfolio-item',
  imports: [GameModal],
  templateUrl: './portfolio-item.html',
  styleUrl: './portfolio-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(wheel)': 'onScroll($event)' }
})
export class PortfolioItem implements OnInit {
  currentGame = input.required<PortfolioGameDTO>();
  initialProgress = input(0);
  progressChanged = output<number>();
  protected readonly background = computed(() => {
    const game = this.currentGame();
    const img = game?.image ?? 'https://images.unsplash.com/photo-1538481143235-5d440e180304?w=800&q=80';
    return `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${img}') center/cover`;
  });
  
  protected readonly scrollProgress = signal(0);
  // Track a binary expanded state so visual `.expanded` only toggles after tick thresholds
  private expandedState = signal(false);
  protected readonly isFullyExpanded = computed(() => this.expandedState());
  private isScrollLocked = false;
  // Tick counters for discrete expand/collapse
  private expandTickCounter = 0;
  private collapseTickCounter = 0;
  isOpened = false;

  constructor(private elementRef: ElementRef) {
    effect(() => {
      this.applyProgress(this.initialProgress());
    });
  }

  ngOnInit() {
    this.applyProgress(this.initialProgress());
  }

  private applyProgress(progress: number) {
    const clampedProgress = Math.max(0, Math.min(progress, 1));
    this.scrollProgress.set(clampedProgress);
    if (clampedProgress >= 1) {
      this.expandedState.set(true);
      this.expandTickCounter = 0;
      this.collapseTickCounter = 0;
    } else if (clampedProgress <= 0) {
      this.expandedState.set(false);
      this.expandTickCounter = 0;
      this.collapseTickCounter = 0;
    }
  }

  onScroll(event: WheelEvent) {
    // Check if scrolling is locked (we're in the portfolio item section)
    const container = this.elementRef.nativeElement;
    const rect = container.getBoundingClientRect();
    const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;

    if (!isInView) {
      this.isScrollLocked = false;
      return;
    }

    // Lock scroll when in view
    if (!this.isScrollLocked) {
      this.isScrollLocked = true;
    }

    const isDown = event.deltaY > 0;
    const isUp = event.deltaY < 0;

    // EXPAND: when not expanded, consume downward ticks locally until threshold reached
    if (isDown && !this.expandedState()) {
      this.expandTickCounter = Math.min(this.expandTickCounter + 1, EXPAND_TICKS);
      const progress = this.expandTickCounter / EXPAND_TICKS;
      // Visual feedback while ticking
      this.scrollProgress.set(progress);
      this.progressChanged.emit(progress);
      event.preventDefault();

      if (this.expandTickCounter >= EXPAND_TICKS) {
        this.expandedState.set(true);
        this.scrollProgress.set(1);
        this.progressChanged.emit(1);
        this.expandTickCounter = 0;
        this.collapseTickCounter = 0;
      }

      return;
    }

    // COLLAPSE: when expanded, consume upward ticks locally until threshold reached.
    // Important: keep `.expanded` visually until threshold is met so collapse doesn't happen immediately.
    if (isUp && this.expandedState()) {
      this.collapseTickCounter = Math.min(this.collapseTickCounter + 1, EXPAND_TICKS);
      const progress = Math.max(0, 1 - this.collapseTickCounter / EXPAND_TICKS);
      // Emit fractional progress for feedback but do not flip the expandedState until threshold
      this.scrollProgress.set(progress);
      this.progressChanged.emit(progress);
      event.preventDefault();

      if (this.collapseTickCounter >= EXPAND_TICKS) {
        this.expandedState.set(false);
        this.scrollProgress.set(0);
        this.progressChanged.emit(0);
        this.collapseTickCounter = 0;
        this.expandTickCounter = 0;
      }

      return;
    }

    // If we're expanded and scrolling down, don't consume the event — let parent handle advancing.
    if (isDown && this.expandedState()) {
      return;
    }

    // If we're collapsed and scrolling up, allow parent to handle navigating to previous game.
    if (isUp && !this.expandedState()) {
      return;
    }
  }
}
