import { Component, OnInit } from '@angular/core';
import { Material } from '../material-model/material.model';
import { MaterialService } from '../material-service/material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {
  materials: Material[] = []; // Full list of materials
  filteredMaterials: Material[] = []; // List of materials filtered by search
  searchQuery: string = ''; // Search term
  includeInactive: boolean = false; // Include inactive materials flag

  // Pagination properties
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 15; // Default number of items per page
  pageSizeOptions: number[] = [15, 30]; // Dropdown options for items per page

  constructor(private materialService: MaterialService) { }

  ngOnInit() {
    this.materialService.apiUrl$.subscribe((apiUrl) => {
      if (apiUrl) {
        this.materialService.getActiveMaterials().subscribe(
          (materials) => {
            this.materials = materials; // Store the full list of materials
            this.filteredMaterials = materials; // Initialize filtered list with all materials
          },
          (error) => {
            console.error('Error fetching materials', error);
          }
        );
      }
    });
  }

  loadAllMaterials(): void {
    this.materialService.getMaterials().subscribe(
      (data) => {
        this.materials = data;
        console.log('All Count: ', data);
      },
      (error) => {
        console.error('Error fetching materials', error);
      }
    );
  }

  loadActiveMaterials(): void {
    this.materialService.getActiveMaterials().subscribe(
      (data) => {
        this.materials = data;
        console.log('Active Count: ', data);
      },
      (error) => {
        console.error('Error fetching materials', error);
      }
    );
  }

  // get filteredByActive() {
  //   if (this.includeInactive) {
     
  //     return this.materialService.getMaterials();
  //   } else {
  //     return this.materials.filter(material => material.active); 
  //   }
  // }

  // Method to filter materials based on the search query
  searchMaterials() {
    if (!this.searchQuery) {
      // If the search query is empty, show all materials
      this.filteredMaterials = this.materials;
    } else {
      // Filter materials based on the search query (case-insensitive)
      this.filteredMaterials = this.materials.filter(material =>
        material.materialName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.currentPage = 1; // Reset to the first page after searching
  }

  // Method to handle page changes
  onPageChange(page: number) {
    this.currentPage = page;
  }

  onItemsPerPageChange(itemsPerPage: number | string) {
    if (itemsPerPage === 'View All') {
      this.itemsPerPage = this.filteredMaterials.length;
    } else {
      this.itemsPerPage = itemsPerPage as number; 
    }
    this.currentPage = 1; 
  }

  applyChanges() {
    console.log('applyChanges() clicked');
    console.log('this.includeInactive: ', this.includeInactive);
    if (this.includeInactive)
    {
      console.log('getMaterials');
      this.loadAllMaterials();
    }
    else
    {
      console.log('getActiveMaterials');
      this.loadActiveMaterials();
    }
  }

  // Method to handle row clicks
  onRowClick(materialId: number) {
    console.log('Material clicked with ID:', materialId);
  }

  // Helper method to get the current page of materials
  get paginatedMaterials(): Material[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredMaterials.slice(startIndex, endIndex);
  }

  // Helper method to get the total number of pages
  get totalPages(): number {
    return Math.ceil(this.filteredMaterials.length / this.itemsPerPage);
  }
}