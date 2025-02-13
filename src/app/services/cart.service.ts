import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>(this.loadCart()); // ✅ Load cart from localStorage
  cart$ = this.cart.asObservable();

  constructor() {}

  getCart() {
    return this.cart$;
  }

  addToCart(product: any) {
    let currentCart = this.cart.value;
    const existingProduct = currentCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += product.quantity; // ✅ Increase quantity if product exists
    } else {
      currentCart.push(product);
    }

    this.updateCart(currentCart); // ✅ Use correct variable
  }

  private loadCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]'); // ✅ Load from localStorage
  }

  updateCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart)); // ✅ Save to localStorage
    this.cart.next(cart); // ✅ Notify subscribers
  }
}
