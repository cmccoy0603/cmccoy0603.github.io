import { Component, input, Signal, ChangeDetectionStrategy, signal, OnInit, HostListener, ElementRef, computed, output, effect } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-portfolio-item',
  imports: [DecimalPipe],
  templateUrl: './portfolio-item.html',
  styleUrl: './portfolio-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: { '(wheel)': 'onScroll($event)' }
})
export class PortfolioItem implements OnInit {
  currentGame = input.required<PortfolioGameDTO>()
  doneScrolling = output<number>();
  
  protected readonly scrollProgress = signal(0);
  protected readonly isFullyExpanded = computed(() => this.scrollProgress() === 1);
  private isScrollLocked = false;
  private scrollAmount = 0;
  private lastGameId: number | null = null;
  private readonly maxScroll = 1000; // pixels needed to fully expand

  constructor(private elementRef: ElementRef) {
    // Reset scroll when game changes
    effect(() => {
      const gameId = this.currentGame().id;
      if (this.lastGameId !== null && this.lastGameId !== gameId) {
        this.resetScroll();
      }
      this.lastGameId = gameId;
    });
  }

  ngOnInit() {
    this.isScrollLocked = false;
    this.scrollAmount = 0;
  }

  private resetScroll() {
    this.isScrollLocked = false;
    this.scrollAmount = 0;
    this.scrollProgress.set(0);
    this.doneScrolling.emit(-1); // Emit minima state
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
      this.scrollAmount = 0;
    }

    const isScrollingDown = event.deltaY > 0;
    const isScrollingUp = event.deltaY < 0;
    const isAtMinima = this.scrollAmount === 0;
    const isAtMaxima = this.scrollAmount === this.maxScroll;

    if(isAtMaxima) {
      this.doneScrolling.emit(1)
    } else if (isAtMinima) {
      this.doneScrolling.emit(-1)
    } else {
      this.doneScrolling.emit(0)
    }

    // Allow scroll only if:
    // - We're not at minima when scrolling up
    // - We're not at maxima when scrolling down
    const shouldAllowScroll = 
      (isScrollingDown && !isAtMaxima) || 
      (isScrollingUp && !isAtMinima);

    if (!shouldAllowScroll) {
      return;
    }

    event.preventDefault();
    
    // Add scroll delta
    this.scrollAmount += event.deltaY;
    
    // Clamp scroll amount between 0 and maxScroll
    this.scrollAmount = Math.max(0, Math.min(this.scrollAmount, this.maxScroll));
    
    // Calculate progress as percentage (0 to 1)
    const progress = this.scrollAmount / this.maxScroll;
    this.scrollProgress.set(progress);
  }
}
