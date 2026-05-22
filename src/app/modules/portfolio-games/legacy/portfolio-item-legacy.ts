import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, input, OnInit, output, signal } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';
import { GameModal } from '../../../shared/game-modal/game-modal';

@Component({
  selector: 'app-portfolio-item-legacy',
  standalone: true,
  imports: [GameModal],
  templateUrl: './portfolio-item-legacy.html',
  styleUrl: './portfolio-item-legacy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(wheel)': 'onScroll($event)' }
})
export class PortfolioItemLegacy implements OnInit {
  currentGame = input.required<PortfolioGameDTO>();
  initialProgress = input(0);
  progressChanged = output<number>();
  protected readonly background = computed(() => {
    const game = this.currentGame();
    const img = game?.image ?? 'https://images.unsplash.com/photo-1538481143235-5d440e180304?w=800&q=80';
    return `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${img}') center/cover`;
  });
  
  protected readonly scrollProgress = signal(0);
  private expandedState = signal(false);
  protected readonly isFullyExpanded = computed(() => this.expandedState());
  private isScrollLocked = false;
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
    const container = this.elementRef.nativeElement;
    const rect = container.getBoundingClientRect();
    const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;

    if (!isInView) {
      this.isScrollLocked = false;
      return;
    }

    if (!this.isScrollLocked) {
      this.isScrollLocked = true;
    }

    const isDown = event.deltaY > 0;
    const isUp = event.deltaY < 0;

    if (isDown && !this.expandedState()) {
      this.expandTickCounter = Math.min(this.expandTickCounter + 1, 4);
      const progress = this.expandTickCounter / 4;
      this.scrollProgress.set(progress);
      this.progressChanged.emit(progress);
      event.preventDefault();

      if (this.expandTickCounter >= 4) {
        this.expandedState.set(true);
        this.scrollProgress.set(1);
        this.progressChanged.emit(1);
        this.expandTickCounter = 0;
        this.collapseTickCounter = 0;
      }

      return;
    }

    if (isUp && this.expandedState()) {
      this.collapseTickCounter = Math.min(this.collapseTickCounter + 1, 4);
      const progress = Math.max(0, 1 - this.collapseTickCounter / 4);
      this.scrollProgress.set(progress);
      this.progressChanged.emit(progress);
      event.preventDefault();

      if (this.collapseTickCounter >= 4) {
        this.expandedState.set(false);
        this.scrollProgress.set(0);
        this.progressChanged.emit(0);
        this.collapseTickCounter = 0;
        this.expandTickCounter = 0;
      }

      return;
    }

    if (isDown && this.expandedState()) {
      return;
    }

    if (isUp && !this.expandedState()) {
      return;
    }
  }
}