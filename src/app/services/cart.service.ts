import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>(this.loadCart()); 
  cart$ = this.cart.asObservable();

  constructor() {}

  getCart() {
    return this.cart$;
  }

  addToCart(product: any) {
    let currentCart = this.cart.value.map(item => ({
      ...item,
      quantity: Number(item.quantity), 
      price: Number(item.price),
    }));

    const existingProduct = currentCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += Number(product.quantity); 
    } else {
      currentCart.push({ ...product, quantity: Number(product.quantity), price: Number(product.price) });
    }

    this.updateCart(currentCart);
  }

  private loadCart(): any[] {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return []; 
    try {
      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart.map(item => ({
        ...item,
        quantity: Number(item.quantity), 
        price: Number(item.price),
      })) : [];
    } catch (error) {
      console.error('Error parsing cart:', error);
      return [];
    }
  }

  updateCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart)); 
    this.cart.next(cart);
  }
}
