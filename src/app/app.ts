import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'pcs-root',
  imports: [RouterOutlet],
  template: `
    <div class="container mt-4">
      <h1 class="text-info-emphasis">Pretraga proizvoda u {{ title() }}!</h1>

      <router-outlet/>
    </div>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('ymmoT');
}
