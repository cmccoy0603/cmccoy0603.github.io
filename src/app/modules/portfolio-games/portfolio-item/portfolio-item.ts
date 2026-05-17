import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, input, OnInit, output, signal } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';
import { DecimalPipe } from '@angular/common';

export type PortfolioItemScrollState = 'min' | 'mid' | 'max';

@Component({
  selector: 'app-portfolio-item',
  imports: [DecimalPipe],
  templateUrl: './portfolio-item.html',
  styleUrl: './portfolio-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(wheel)': 'onScroll($event)' }
})
export class PortfolioItem implements OnInit {
  currentGame = input.required<PortfolioGameDTO>();
  initialProgress = input(0);
  progressChanged = output<number>();
  
  protected readonly scrollProgress = signal(0);
  protected readonly isFullyExpanded = computed(() => this.scrollProgress() >= 1);
  private isScrollLocked = false;
  private scrollAmount = 0;
  private readonly maxScroll = 1000; // pixels needed to fully expand

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
    this.scrollAmount = clampedProgress * this.maxScroll;
    this.scrollProgress.set(clampedProgress);
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

    const nextScrollAmount = Math.max(0, Math.min(this.scrollAmount + event.deltaY, this.maxScroll));
    const nextProgress = nextScrollAmount / this.maxScroll;

    if (nextScrollAmount === this.scrollAmount) {
      this.progressChanged.emit(nextProgress);
      return;
    }

    event.preventDefault();
    this.scrollAmount = nextScrollAmount;
    this.scrollProgress.set(nextProgress);
    this.progressChanged.emit(nextProgress);
  }
}
