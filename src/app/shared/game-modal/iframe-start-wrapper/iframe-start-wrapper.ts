import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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

  private sanitizer = inject(DomSanitizer);
  private started = signal(false);

  iframeSrc = computed(() =>
    this.started() ? this.sanitizer.bypassSecurityTrustResourceUrl(this.src()) : null
  );

  start() {
    this.started.set(true);
  }
}