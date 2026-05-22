import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioGamesLegacyComponent } from '../../modules/portfolio-games/legacy/portfolio-games-legacy';

@Component({
  selector: 'app-legacy-portfolio-page',
  standalone: true,
  imports: [RouterLink, PortfolioGamesLegacyComponent],
  templateUrl: './legacy-portfolio-page.html',
  styleUrl: './legacy-portfolio-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyPortfolioPageComponent {}