import {Component, ViewEncapsulation} from '@angular/core';
import {SalesService} from '../../shared/services/sales.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
  sales: Array<{title: string, content: string, previous: number, current: number}>;
  constructor(private sale: SalesService) {
      this.sales = [
          {title : '今日', content : '比昨日', previous : this.sale.getSales(), current : this.sale.getSales()},
          {title : '七日', content : '比同期', previous : this.sale.getSales(), current : this.sale.getSales()},
          {title : '本月', content : '比同期', previous : this.sale.getSales(), current : this.sale.getSales()}
      ];
  }
  // constructor() {}

  minus(current: number, previous: number): number {
      const result = current - previous;
      if (result > 0) {
          return 1;
      } else if (result === 0) {
          return 0;
      } else {
          return -1;
      }
  }

}
