import { Component, OnInit } from '@angular/core';
import { Material } from '../material-model/material.model';
import { MaterialService } from '../material-service/material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {
  materials: Material[] = [];

  constructor(private materialService: MaterialService) { }

    ngOnInit() {
      this.materialService.apiUrl$.subscribe((apiUrl) => {
        if (apiUrl) {
          this.materialService.getMaterials().subscribe(
            (materials) => {
              this.materials = materials;
            },
            (error) => {
              console.error('Error fetching materials', error);
            }
          );
        }
      });
    }

  includeInactive: boolean = false;

  applyChanges() {}

  onRowClick(materialId: number) {
    console.log('Material clicked with ID:', materialId);
  }
}
