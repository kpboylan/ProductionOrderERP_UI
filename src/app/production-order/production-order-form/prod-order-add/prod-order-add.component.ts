import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/product/product-model/product.model';
import { ProductNew } from 'src/app/product/product-model/product-new.model';
import { ProductionLine } from 'src/app/production-line/model/production-line.model';
import { WorkCenter } from 'src/app/work-center/model/work-center.model';
import { ProdOrderService } from '../../service/prod-order.service';
import { UOM } from '../../service/prod-order.service';

@Component({
  selector: 'app-prod-order-add',
  templateUrl: './prod-order-add.component.html',
  styleUrls: ['./prod-order-add.component.css']
})
export class ProdOrderAddComponent implements OnInit {
  productionOrderForm: FormGroup;
  uoms: UOM[] = []; 

  
  // Sample data - in a real app, these would come from a service
  products: ProductNew[] = [
    { code: 'PROD-001', name: 'Aspirin 500mg Tablets' },
    { code: 'PROD-002', name: 'Ibuprofen 200mg Tablets' },
    { code: 'PROD-003', name: 'Paracetamol 500mg Tablets' },
    { code: 'PROD-004', name: 'Amoxicillin 250mg Capsules' }
  ];

  productionLines: ProductionLine[] = [
    { id: 'LINE-1', name: 'Tableting Line 1' },
    { id: 'LINE-2', name: 'Tableting Line 2' },
    { id: 'LINE-3', name: 'Capsule Filling Line' },
    { id: 'LINE-4', name: 'Liquid Filling Line' }
  ];

  workCenters: WorkCenter[] = [
    { id: 'WC-101', name: 'Primary Manufacturing' },
    { id: 'WC-102', name: 'Secondary Packaging' },
    { id: 'WC-103', name: 'Sterile Production' }
  ];

  constructor(private fb: FormBuilder, private prodOrderService: ProdOrderService) { 
    this.productionOrderForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initForm();
    this.generateOrderNumber();
    this.loadUOM();
  }

  initForm(): void {
    this.productionOrderForm = this.fb.group({
      orderNumber: [''],
      priority: ['normal'],
      productCode: ['', Validators.required],
      batchNumber: ['', Validators.required],
      targetQuantity: ['', [Validators.required, Validators.min(1)]],
      uom: ['tablets', Validators.required],
      yield: ['95', [Validators.min(0), Validators.max(100)]],
      productionLine: ['', Validators.required],
      workCenter: ['', Validators.required],
      plannedStartDate: ['', Validators.required],
      plannedEndDate: ['', Validators.required],
      instructions: ['']
    });
  }

  generateOrderNumber(): void {
    // In a real app, this would come from a service
    const randomNum = Math.floor(Math.random() * 90000) + 10000;
    const today = new Date();
    const orderNumber = `PO-${today.getFullYear()}${(today.getMonth()+1).toString().padStart(2, '0')}-${randomNum}`;
    this.productionOrderForm.patchValue({
      orderNumber: orderNumber
    });
  }

  onSubmit(): void {
    if (this.productionOrderForm.valid) {
      console.log('Production Order Data:', this.productionOrderForm.value);
      // In a real app, you would call a service to save the production order
      alert('Production order created successfully!');
    }
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      this.productionOrderForm.reset();
      this.generateOrderNumber();
    }
  }

  loadUOM(): void {
    this.prodOrderService.getUOM().subscribe({
        next: (data) => {
          this.uoms = data;
          console.log('UOM data:', data);
        },
        error: (error) => {
          console.error('Error fetching UOM:', error);
        }
      });
  }
}
