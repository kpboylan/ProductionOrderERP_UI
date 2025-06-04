import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialService, MaterialType, UOM } from '../material-service/material.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css']
})
export class MaterialFormComponent implements OnInit {

  materialForm: FormGroup;
  materialTypes: MaterialType[] = []; 
  uoms: UOM[] = []; 
  selectedMaterialTypeID: number | null = null;
  selecteduomid: number | null = null;

    constructor(private fb: FormBuilder, private router: Router, private materialService: MaterialService, private http: HttpClient) {
      this.materialForm = this.fb.group({
        materialName: ['', [Validators.required]],
        materialType: ['', [Validators.required]],
        description: ['', [Validators.required]],
        currentStock: ['', [Validators.required]],
        uomid: ['', [Validators.required]],
        active: [false]
      });
    }

    ngOnInit(): void {
      this.materialService.apiUrl$.subscribe((apiUrl) => {
        if (apiUrl) {
          this.loadMaterialTypes();
          this.loadUOM();
        }286125
      });
    }

    loadMaterialTypes(): void {
      this.materialService.getMaterialTypes().subscribe(
        (data) => {
          this.materialTypes = data;
          console.log('MaterialType data: ', data);
        },
        (error) => {
          console.error('Error fetching MaterialTypes:', error);
        }
      );
    }

    loadUOM(): void {
      this.materialService.getUOM().subscribe({
        next: (data) => {
          this.uoms = data;
          console.log('UOM data:', data);
        },
        error: (error) => {
          console.error('Error fetching UOM:', error);
        }
      });
    }


/*     loadUOM(): void {
      this.materialService.getUOM().subscribe(
        (data) => {
          this.uoms = data;
          console.log('UOM data: ', data);
        },
        (error) => {
          console.error('Error fetching UOM:', error);
        }
      );
    } */

    onSubmit(): void {
      if (this.materialForm.valid) {
        const materialData = this.materialForm.value;
  
        console.log('Form Values:', materialData); 
  
        this.materialService.createMaterial(materialData).subscribe(response => {
          console.log('Material created successfully', response);
          this.router.navigate(['/materials']);
        });
      } else {
        console.log('Form is invalid');
      }
    }

    onMaterialTypeChange(event: any): void {
      this.selectedMaterialTypeID = event.target.value;
      console.log('Selected MaterialTypeID:', this.selectedMaterialTypeID);
    }

    onUOMChange(event: any): void {
      this.selecteduomid = event.target.value;
      console.log('Selected UOM ID:', this.selecteduomid);
    }
}
