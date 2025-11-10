import { inject, InjectionToken } from '@angular/core';
import { API_CONFIG } from '../app/app.config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_CLIENT = new InjectionToken<SupabaseClient>('supabase');

export function provideSupClient() {
  const { supabase: apiConfig } = inject(API_CONFIG);
  const { key: supabaseKey, url: supabaseUrl } = apiConfig;
  return createClient(supabaseUrl, supabaseKey);
}
