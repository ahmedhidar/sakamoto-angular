import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>(this.loadCart());
  cart$ = this.cart.asObservable();

  constructor() {}

  private loadCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  getCart() {
    return this.cart$;
  }

  addToCart(product: any) {
    let cart = this.loadCart();
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    this.updateCart(cart); // ✅ Call updateCart instead of duplicating code
  }

  // ✅ Add this method to update cart properly
  updateCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart.next(cart); // Notify all subscribers
  }
}
