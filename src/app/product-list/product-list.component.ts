import { Component } from '@angular/core';
import { ProductRequestsService } from './../services/product-requests.service';
import { Product } from '../types/product';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-list',
imports:[CommonModule, ProductComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productRequestsService: ProductRequestsService) {}

  ngOnInit() {
    this.productRequestsService.getProductsRequests().subscribe((res) => {
      this.products = res.products; // Correctly accessing the "products" key
    });
  }

  removeProduct(productId: number) {
    this.products = this.products.filter((product) => product.id !== productId);
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }
}
