import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from './../counter.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  @Input() product: any; // Receive product data from parent
  cartCount: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private counterService: CounterService
  ) {}

  ngOnInit() {
    // ✅ Listen to cart updates and update count
    this.cartService.getCart().subscribe((cart) => {
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

addToCart(product: any) {
  const productToAdd = {
    ...product,
    quantity: 1, // تأكد من وجود الكمية الافتراضية
    price: Number(product.price) > 0 ? Number(product.price) : 0, // التأكد من أن السعر موجود وصحيح
  };

  this.cartService.addToCart(productToAdd);
}

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    const starsArray: string[] = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starsArray.push('full');
    }

    // Add half star if needed
    if (hasHalfStar) {
      starsArray.push('half');
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsArray.push('empty');
    }

    return starsArray;
  }

  handleRedirectToDetails(id: number) {
    this.router.navigate(['/product-page', id]);
  }
}
