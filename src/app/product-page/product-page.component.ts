import { Component, inject, Input, input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import productsData from '../../../public/products.json';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalePipe } from '../sale.pipe';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule,FormsModule,SalePipe],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
@Input()id:string='';
// activatedRoute = inject(ActivatedRoute);
products: any[] = productsData.products;
productData: any;
quantity = 1;

constructor(private router: Router) {};

ngOnInit(){
  // const productId = this.activatedRoute.snapshot.params['id'];
this.productData = this.products.find(product => product.id === Number(this.id))
}

getStars(rating: number): string[] {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return [
    ...Array(fullStars).fill('full'),
    ...(hasHalfStar ? ['half'] : []),
    ...Array(emptyStars).fill('empty')
  ];
}

goBack() {
  this.router.navigate(['/']);
}
decreaseQuantity() {
  if (this.quantity > 1) this.quantity--;
}

increaseQuantity() {
  this.quantity++;
}
}
