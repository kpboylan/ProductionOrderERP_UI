import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-graphql-products',
  templateUrl: './graphql-products.component.html',
  styleUrls: ['./graphql-products.component.css']
})
export class GraphqlProductsComponent implements OnInit {
  products: Product[] = [];
  maxPrice: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
/*     this.productService.getProducts().subscribe((data) => {
      this.products = data;
    }); */
    this.loadProducts();
  }

  onFilterChange(): void {
    this.loadProducts();
  }

  loadProducts(): void {
  this.productService
    .getProducts(typeof this.maxPrice === 'number' ? this.maxPrice : undefined)
    .subscribe((data) => {
      this.products = data;
    });
}





//   loadProducts(): void {
//   const variables = this.maxPrice != null ? { maxPrice: this.maxPrice } : {};

//   this.productService.getProducts(variables).subscribe((data) => {
//     this.products = data;
//   });
// }

  // loadProducts(): void {
  //   this.productService.getProducts(this.maxPrice ?? undefined).subscribe((data) => {
  //     this.products = data;
  //   });
  // }
}
