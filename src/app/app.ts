import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IntroComponent } from './modules/intro/intro';
import { PortfolioGamesComponent } from './modules/portfolio-games/portfolio-games';
import { SkillsComponent } from './modules/skills/skills';
import { ContactComponent } from './modules/contact/contact';

@Component({
  selector: 'app-root',
  imports: [IntroComponent, PortfolioGamesComponent, SkillsComponent, ContactComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
