import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalePipe } from '../sale.pipe';
import { ProductRequestsService } from '../services/product-requests.service';
import { CartService } from '../services/cart.service';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, FormsModule, SalePipe],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  @Input() id: string = '';
  productData: any;
  quantity = 1;
  cartCount: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductRequestsService,
        private cartService: CartService,
        private counterService:CounterService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this.fetchProduct(productId);
    }

      this.cartService.getCart().subscribe((cart) => {
        this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  })
  }
  addToCart(product: any) {
    const productToAdd = {
      ...product,
      quantity: this.quantity, // ✅ Add the selected quantity
    };

    this.cartService.addToCart(productToAdd);
  }

  fetchProduct(productId: string) {
    this.productService.getProductsRequests(productId).subscribe(
      (res) => {
        this.productData = res;
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
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
