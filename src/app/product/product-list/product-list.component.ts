import { Component, OnInit } from '@angular/core';
import { Product } from '../../product/product-model/product.model';
import { ProductService } from '../../product/product-service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadActiveProducts();
  }

  onRowClick(productId: number) {
    console.log('Product clicked with ID:', productId);
    // You can navigate to a different page, open a modal, or do something else with the productId.
  }

  loadActiveProducts(): void {
    this.productService.getActiveProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  includeInactive: boolean = false;
  get filteredProducts() {
    if (this.includeInactive) {
      //return this.products; // Show all products if the checkbox is checked
      return this.productService.getAllProducts();
    } else {
      return this.products.filter(product => product.active); // Only show active products
    }
  }

  applyChanges() {
    // Optionally, you can perform additional logic here, such as logging or displaying a message.
    console.log('Apply changes clicked. Inactive products included:', this.includeInactive);
    if (this.includeInactive)
    {
      this.loadAllProducts();
    }
    else
    {
      this.loadActiveProducts();
    }
  }
}
