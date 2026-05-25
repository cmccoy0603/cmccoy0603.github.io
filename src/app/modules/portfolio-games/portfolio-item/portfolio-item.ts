import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, output, signal } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';

@Component({
  selector: 'app-portfolio-item',
  standalone: true,
  templateUrl: './portfolio-item.html',
  styleUrl: './portfolio-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'portfolio-card-host',
  }
})
export class PortfolioItem {
  private readonly destroyRef = inject(DestroyRef);

  game = input.required<PortfolioGameDTO>();
  selected = output<PortfolioGameDTO>();
  protected readonly activePreviewIndex = signal(0);

  private previewTimerId: number | null = null;

  protected readonly previewImages = computed(() => {
    const images = [this.game().image, ...(this.game().screenshots ?? [])].filter(
      (image): image is string => Boolean(image),
    );

    return [...new Set(images)];
  });

  protected readonly carouselTrackStyle = computed(() => {
    return `transform: translateX(-${this.activePreviewIndex() * 100}%);`;
  });

  constructor() {
    this.destroyRef.onDestroy(() => this.stopPreviewRotation());
  }

  protected getSlideBackgroundImage(image: string) {
    return `linear-gradient(180deg, rgba(11, 16, 32, 0.1), rgba(11, 16, 32, 0.78)), url('${image}')`;
  }

  protected onSelect() {
    this.selected.emit(this.game());
  }

  protected onHoverStart() {
    if (this.previewImages().length < 2 || this.previewTimerId !== null) {
      return;
    }

    this.activePreviewIndex.set(0);
    this.previewTimerId = window.setInterval(() => {
      const previewImages = this.previewImages();
      this.activePreviewIndex.update((currentIndex) => (currentIndex + 1) % previewImages.length);
    }, 900);
  }

  protected onHoverEnd() {
    this.stopPreviewRotation();
    this.activePreviewIndex.set(0);
  }

  private stopPreviewRotation() {
    if (this.previewTimerId === null) {
      return;
    }

    window.clearInterval(this.previewTimerId);
    this.previewTimerId = null;
  }
}