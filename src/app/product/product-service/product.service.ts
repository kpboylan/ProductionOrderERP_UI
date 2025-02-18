import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../product/product-model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl = 'https://localhost:7283/api/Product'; 

  constructor(private http: HttpClient) { }

  // Method to get all active products
  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/active');
  }

  // Method to get all active and inactive products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/all');
  }

  // Create a new product
  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(productId: number, product: Product): Observable<void> {
    const url = `${this.apiUrl}/${productId}`;
    console.log('URL in service: ', url);
    return this.http.put<void>(url, product);
  }

  getProductById(productId: number): Observable<Product> {
    let url = this.apiUrl + '/getProduct?productId=' + productId;
    return this.http.get<Product>(url);
  }
}