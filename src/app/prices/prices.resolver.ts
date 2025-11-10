import { ResolveFn } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { inject } from '@angular/core';
import { API_CONFIG } from '../app.config';

export const pricesResolver: ResolveFn<any[]> = async (route, state) => {
  const { supabase: apiConfig } = inject(API_CONFIG);
  const { key: supabaseKey, url: supabaseUrl } = apiConfig;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const {
    data,
    error
  } = await supabase.from('prices').select(`
    products ( barcode, name, brand, category, unit, quantity ),
    price,
    unit_price,
    best_price_30,
    anchor_price,
    special_price,
    stores (city, zipcode, address)
  `).limit(2000);

  return data as any[];
};
