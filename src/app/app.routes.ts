import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'deals',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/deals/pages/deals-page/deals-page.component').then(
        (m) => m.DealsPageComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'deals',
  },
  {
    path: '**',
    redirectTo: 'deals',
  },
];
