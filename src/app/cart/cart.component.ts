import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
    });
  }

  incrementQuantity(item: any) {
    item.quantity++;
    this.updateCart();
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeFromCart(item); // Remove item if quantity is 1
    }
    this.updateCart();
  }

  removeFromCart(item: any) {
    this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
    this.updateCart();
  }

  getTotalItems(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  updateCart() {
    this.cartService.updateCart(this.cart); // Sync with cart service
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
