import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../../product/product-service/product.service';
import { Router } from '@angular/router';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: Router;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['createProduct']);

    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.productForm.value).toEqual({
      productName: '',
      productCode: '',
      active: false
    });
  });

  it('should validate productName as required', () => {
    const productNameControl = component.productForm.get('productName');
    productNameControl?.setValue('');
    expect(productNameControl?.valid).toBeFalse();
    productNameControl?.setValue('Test Product');
    expect(productNameControl?.valid).toBeTrue();
  });

  it('should validate productCode as required', () => {
    const productCodeControl = component.productForm.get('productCode');
    productCodeControl?.setValue('');
    expect(productCodeControl?.valid).toBeFalse();
    productCodeControl?.setValue('TEST123');
    expect(productCodeControl?.valid).toBeTrue();
  });

  it('should call createProduct and navigate to /products on successful form submission', () => {
    const productData = {
      productName: 'Test Product',
      productCode: 'TEST123',
      active: true
    };

    component.productForm.setValue(productData);
    productService.createProduct.and.returnValue(of({}));

    const navigateSpy = spyOn(router, 'navigate');

    component.onSubmit();

    expect(productService.createProduct).toHaveBeenCalledWith(productData);
    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });

  it('should not call createProduct if the form is invalid', () => {
    component.productForm.setValue({
      productName: '',
      productCode: '',
      active: false
    });

    component.onSubmit();

    expect(productService.createProduct).not.toHaveBeenCalled();
  });

/*   it('should handle error when createProduct fails', () => {
    const productData = {
      productName: 'Test Product',
      productCode: 'TEST123',
      active: true
    };

    component.productForm.setValue(productData);
    productService.createProduct.and.returnValue(throwError('Error'));

    const consoleSpy = spyOn(console, 'log');

    component.onSubmit();

    expect(productService.createProduct).toHaveBeenCalledWith(productData);
    expect(consoleSpy).toHaveBeenCalledWith('Form Values:', productData);
  }); */
});