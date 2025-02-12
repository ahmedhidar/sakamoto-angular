import { Component } from '@angular/core';
import productsData from '../../../public/products.json';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { Product } from '../types/product';

@Component({
  selector: 'app-product-list',
imports:[ProductComponent,CommonModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  products: Array<Product> =[... productsData.products];

  trackById(index: number, product: any): number {
    return product.id;
  }
}
