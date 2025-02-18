import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../material-model/material.model';
import { MaterialService, MaterialType, UOM  } from '../material-service/material.service';

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.css']
})
export class MaterialEditComponent {
  materialEditForm: FormGroup;
  materialID: number | null = null;
  materialTypes: MaterialType[] = []; 
  uoms: UOM[] = []; 
  selectedMaterialTypeID: number | null = null;
  selecteduomid: number | null = null;

  material: Material = {
    materialID: 0,
    materialName: '',
    materialType: 0,
    uomId: 0,
    description: '',
    active: false,
    currentStock: 0,
    uomCode: '',
    materialTypeAbbreviation: ''
  };

constructor(private fb: FormBuilder, 
  private router: Router, 
  private route: ActivatedRoute, 
  private materialService: MaterialService, 
  private http: HttpClient) {
        this.materialEditForm = this.fb.group({
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
      }
    });

    this.materialID = +this.route.snapshot.paramMap.get('id')!;

          this.materialService.getMaterialById(this.materialID).subscribe({
            next: (material: Material) => {
              if (material) {
                this.materialEditForm.patchValue({
                  materialName: material.materialName,
                  materialType: material.materialType,
                  description: material.description,
                  uomid: material.uomId,
                  currentStock: material.currentStock,
                  active: material.active
                });
              } else {
                console.error('Material data is null or undefined');
              }
            },
            error: (err) => {
              console.error('Error fetching material:', err);
            }
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
    this.materialService.getUOM().subscribe(
      (data) => {
        this.uoms = data;
        console.log('UOM data: ', data);
      },
      (error) => {
        console.error('Error fetching UOM:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.materialEditForm.valid) {
      const materialData = this.materialEditForm.value;
      this.materialID = +this.route.snapshot.paramMap.get('id')!;

      this.material = materialData;
      this.material.materialID = this.materialID;

      console.log('Form Values:', materialData); 

      this.materialService.updateMaterial(this.materialID, materialData).subscribe(response => {
        console.log('Material updated successfully', response);
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
