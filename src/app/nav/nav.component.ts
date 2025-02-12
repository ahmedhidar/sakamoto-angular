import { Component,inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CounterService } from './../counter.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-nav',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
    });
  }
  getTotalItems(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}
