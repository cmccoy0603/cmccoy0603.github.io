import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, computed, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceService } from '../../device.service';

@Component({
  selector: 'app-iframe-start-wrapper',
  standalone: true,
  templateUrl: './iframe-start-wrapper.html',
  styleUrl: './iframe-start-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframeStartWrapper {
  src = input.required<string>();
  title = input('Embedded game');
  buttonLabel = input('Start game');
  description = input('Click to load the playable build.');

  @ViewChild('shell', { static: true })
  private shell?: ElementRef<HTMLDivElement>;

  private readonly deviceService = inject(DeviceService);
  private sanitizer = inject(DomSanitizer);
  private started = signal(false);
  isFullscreen = signal(false);

  readonly isMobile = this.deviceService.isMobile;

  private readonly fullscreenListener = effect((onCleanup) => {
    const syncFullscreenState = () => {
      this.isFullscreen.set(document.fullscreenElement === this.shell?.nativeElement);
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || document.fullscreenElement !== this.shell?.nativeElement) {
        return;
      }

      event.preventDefault();
      void document.exitFullscreen();
    };

    document.addEventListener('fullscreenchange', syncFullscreenState);
    document.addEventListener('keydown', handleKeydown);
    syncFullscreenState();

    onCleanup(() => {
      document.removeEventListener('fullscreenchange', syncFullscreenState);
      document.removeEventListener('keydown', handleKeydown);
    });
  });

  iframeSrc = computed(() =>
    this.started() ? this.sanitizer.bypassSecurityTrustResourceUrl(this.src()) : null
  );

  fullscreenButtonLabel = computed(() => (this.isFullscreen() ? 'Exit fullscreen' : 'Fullscreen'));

  start() {
    this.started.set(true);
  }

  async toggleFullscreen() {
    const shellElement = this.shell?.nativeElement;

    if (!shellElement) {
      return;
    }

    try {
      if (document.fullscreenElement === shellElement) {
        await document.exitFullscreen();
        return;
      }

      await shellElement.requestFullscreen();
    } catch {
      this.isFullscreen.set(false);
    }
  }
}