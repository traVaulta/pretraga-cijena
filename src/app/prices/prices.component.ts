import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filterProducts } from '../common/utils';

@Component({
  selector: 'pcs-prices',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe
  ],
  template: `
    <div class="card">
      <div class="card-header">
        <div class="card-title">Tablica najnovijih proizvoda</div>
        <div class="card-subtitle">
          <input [(ngModel)]="filter" (change)="filterValue.set(filter)" class="form-control" type="text" placeholder="Pretraga" aria-label="Ledeni čaj breskva">
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th class="text-info-emphasis" scope="col">Proizvod</th>
                <th class="text-info-emphasis" scope="col">Dućan</th>
                <th class="text-info-emphasis" scope="col">Cijena</th>
                <th class="text-info-emphasis" scope="col">Jedinična cijena</th>
              </tr>
            </thead>
            <tbody>
              @for (product of productData(); track product.order; let i = $index) {
              <tr>
                <td>{{product.products.name}}</td>
                <td>{{product.stores.city}}</td>
                <td>{{product.price | currency: 'EUR'}}</td>
                <td>{{product.unit_price | currency: 'EUR'}}</td>
              </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table-responsive {
      max-height: 70vh;
    }
  `]
})
export class PricesComponent {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  productData = computed(() => (((this.data() as { priceData: any[] })?.priceData ?? []) as any[])
    .filter(filterProducts(this.filterValue())).map((product, i) => ({ ...product, order: i })));
  filter = '';
  filterValue = signal('');
}
