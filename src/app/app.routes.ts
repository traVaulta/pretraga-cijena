import { Routes } from '@angular/router';

import { pricesResolver } from './prices/prices.resolver';

export const routes: Routes = [
  {
    path: 'preview',
    loadComponent: async () => (await import('./prices/prices.component'))
      .PricesComponent,
    resolve: {
      priceData: pricesResolver
    }
  },
  {
    path: '**',
    redirectTo: '/preview'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/preview'
  }
];
