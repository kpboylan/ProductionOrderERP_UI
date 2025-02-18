import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService } from '../../product/product-service/product.service';
import { Product } from '../product-model/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  productEditForm: FormGroup;
  productId: number | null = null;

  product: Product = {
    productId: 0,
    productName: '',
    productCode: '',
    active: false,
  };

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private productService: ProductService, private http: HttpClient) {
      this.productEditForm = this.fb.group({
        productName: ['', [Validators.required]],
        productCode: ['', [Validators.required]],
        active: [false]
      });
    }

    ngOnInit(): void {
      // Retrieve the productId from the route parameter
      this.productId = +this.route.snapshot.paramMap.get('id')!;
      console.log('Editing product with ID:', this.productId);

      this.productService.getProductById(this.productId).subscribe({
        next: (product: Product) => {
          console.log('Fetched Product:', product);  // Add a log here to inspect the fetched product
          if (product) {
            this.productEditForm.patchValue({
              productName: product.productName,
              productCode: product.productCode,
              active: product.active
            });
          } else {
            console.error('Product data is null or undefined');
          }
        },
        error: (err) => {
          console.error('Error fetching product:', err);  // Log error if request fails
        }
      });
    }

    onSubmit(): void {
      if (this.productEditForm.valid) {
        const productData = this.productEditForm.value;
        this.productId = +this.route.snapshot.paramMap.get('id')!;

        this.product = productData;
        this.product.productId = this.productId;
  
        console.log('Form Values:', productData); // Debugging
  
        this.productService.updateProduct(this.productId, this.product).subscribe(response => {
          console.log('Product successfully updated', response);
          this.router.navigate(['/products']);
          // Handle the response or redirect user
        });
      } else {
        console.log('Form is invalid');
      }
    }
}
