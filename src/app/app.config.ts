import {
  ApplicationConfig,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideSupClient, SUPABASE_CLIENT } from '../infra/sup.client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    {
      provide: SUPABASE_CLIENT,
      useFactory: provideSupClient
    },
    provideRouter(routes)
  ]
};

export interface SupabaseConfig {
  url: string;
  key: string;
}

export interface ApiConfig {
  supabase: SupabaseConfig;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('api-config');

export const provideApiConfig = async () => {
  const response = await fetch('/config.json');
  return {
    provide: API_CONFIG,
    useValue: (await response.json()) as ApiConfig
  };
}
