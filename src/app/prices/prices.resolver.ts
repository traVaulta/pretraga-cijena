import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SUPABASE_CLIENT } from '../../infra/sup.client';

export const pricesResolver: ResolveFn<any[]> = async (route, state) => {
  const supabase = inject(SUPABASE_CLIENT);

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
