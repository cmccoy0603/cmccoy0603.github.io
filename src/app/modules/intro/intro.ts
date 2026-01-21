import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class IntroComponent {}
