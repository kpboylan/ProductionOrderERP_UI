import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../../product/product-model/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should send a POST request to create a product', () => {
    const mockProduct: Product = {
      productId: 1,
      productName: 'Test Product',
      productCode: 'TP123',
      active: true
    };

    service.createProduct(mockProduct).subscribe(response => {
      expect(response).toEqual(mockProduct); // Assuming the server responds with the created product
    });

    const req = httpMock.expectOne('https://localhost:7283/api/Product');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);

    req.flush(mockProduct); // Simulate a response from the server
  });
});