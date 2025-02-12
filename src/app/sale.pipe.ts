import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale'
})
export class SalePipe implements PipeTransform {

  transform(price: number, discount: number): number {
    if (!price || !discount) return price;
    return Number((price - (price * discount) / 100).toFixed(2));
  }

}
