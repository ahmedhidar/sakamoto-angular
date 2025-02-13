import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRequestsService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProductsRequests(id?: string): Observable<any> {
    const url = id ? `${this.apiUrl}/${id}` : this.apiUrl; // Fetch all if no ID
    return this.http.get(url);
  }
}
