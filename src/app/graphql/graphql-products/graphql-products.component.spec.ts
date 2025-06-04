import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlProductsComponent } from './graphql-products.component';

describe('GraphqlProductsComponent', () => {
  let component: GraphqlProductsComponent;
  let fixture: ComponentFixture<GraphqlProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphqlProductsComponent]
    });
    fixture = TestBed.createComponent(GraphqlProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
