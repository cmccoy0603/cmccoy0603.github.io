import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page';
import { LegacyPortfolioPageComponent } from './pages/legacy-portfolio-page/legacy-portfolio-page';

export const routes: Routes = [
	{
		path: '',
		component: HomePageComponent,
	},
	{
		path: 'legacy-portfolio',
		component: LegacyPortfolioPageComponent,
	},
];
