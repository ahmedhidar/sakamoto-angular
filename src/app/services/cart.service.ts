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
    let currentCart = this.cart.value.map(item => ({
      ...item,
      quantity: Number(item.quantity) || 0, 
      price: Number(item.price) || 0,
    }));

    const existingProduct = currentCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += Number(product.quantity) || 0; 
    } else {
      currentCart.push({ ...product, quantity: Number(product.quantity) || 0, price: Number(product.price) || 0 });
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
        quantity: Number(item.quantity) || 0, 
        price: Number(item.price) || 0,
      })) : [];
    } catch (error) {
      console.error('Error parsing cart:', error);
      return [];
    }
  }

  updateCart(cart: any[]) {
    const sanitizedCart = cart.map(item => ({
      ...item,
      quantity: Number(item.quantity) || 0,
      price: Number(item.price) || 0,
    }));
    localStorage.setItem('cart', JSON.stringify(sanitizedCart)); 
    this.cart.next(sanitizedCart); 
  }
}
