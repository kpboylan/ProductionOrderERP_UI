import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService } from '../../product/product-service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private http: HttpClient) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productCode: ['', [Validators.required]],
      active: [false]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      console.log('Form Values:', productData); 

      this.productService.createProduct(productData).subscribe(response => {
        console.log('Product created successfully', response);
        this.router.navigate(['/products']);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
