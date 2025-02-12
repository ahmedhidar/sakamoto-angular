import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
})
export class ProductComponent {

  @Input() product: any; // Receive product data from parent
  constructor(private router: Router) {};
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

  handleRedirectToDetails(id:number){
this.router.navigate(['/product-page',id]);
}
}
