import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdOrderEditComponent } from './prod-order-edit.component';

describe('ProdOrderEditComponent', () => {
  let component: ProdOrderEditComponent;
  let fixture: ComponentFixture<ProdOrderEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdOrderEditComponent]
    });
    fixture = TestBed.createComponent(ProdOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
