import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdOrderAddComponent } from './prod-order-add.component';

describe('ProdOrderAddComponent', () => {
  let component: ProdOrderAddComponent;
  let fixture: ComponentFixture<ProdOrderAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdOrderAddComponent]
    });
    fixture = TestBed.createComponent(ProdOrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
