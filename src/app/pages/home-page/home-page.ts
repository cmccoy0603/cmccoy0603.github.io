import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IntroComponent } from '../../modules/intro/intro';
import { PortfolioGamesComponent } from '../../modules/portfolio-games/portfolio-games';
import { AboutMe } from '../../modules/about-me/about-me';
import { ContactComponent } from '../../modules/contact/contact';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [IntroComponent, AboutMe, PortfolioGamesComponent, ContactComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}