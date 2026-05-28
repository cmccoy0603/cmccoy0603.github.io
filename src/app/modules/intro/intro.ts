import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {
  private readonly introVideo = viewChild.required<ElementRef<HTMLVideoElement>>('introVideo');

  protected readonly isPlaying = signal(false);
  protected readonly playbackFailed = signal(false);

  ngAfterViewInit() {
    void this.startVideo();
  }

  scrollToSection(id: string) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  }

  async startVideo() {
    // Skip attempting autoplay on small/mobile viewports — show gradient instead.
    try {
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches) {
        this.isPlaying.set(false);
        this.playbackFailed.set(false);
        return;
      }
    } catch (e) {
      // ignore
    }

    const video = this.introVideo().nativeElement;

    if (!video) {
      return;
    }

    // Force inaudible state before attempting autoplay — helps browser
    // treat the media as allowed for autoplay.
    try {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
    } catch (e) {
      // ignore
    }

    // Log autoplay policy where available (diagnostic only)
    try {
      const nav: any = navigator as any;
      if (typeof nav.getAutoplayPolicy === 'function') {
        const policy = nav.getAutoplayPolicy('mediaelement');
        // eslint-disable-next-line no-console
        console.log('Navigator.getAutoplayPolicy:', policy);
      }
    } catch (e) {
      // ignore
    }

    try {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
      this.isPlaying.set(true);
      this.playbackFailed.set(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Video.play() failed:', err);
      this.isPlaying.set(false);
      this.playbackFailed.set(true);
    }
  }

  onVideoPlaying() {
    this.isPlaying.set(true);
    this.playbackFailed.set(false);
  }

  onVideoError() {
    this.isPlaying.set(false);
    this.playbackFailed.set(true);
  }
}
