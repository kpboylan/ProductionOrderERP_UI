import { Component, OnInit } from '@angular/core';
import { RoomHumidity } from '../room-model/room-humidity.model';
import { RoomService } from '../room-service/room-service';

@Component({
  selector: 'app-room-humidity',
  templateUrl: './room-humidity.component.html',
  styleUrls: ['./room-humidity.component.css']
})
export class RoomHumidityComponent implements OnInit  {
    filterRoomId: string = '';
    filterBatchId: string = '';
    showSpikesOnly: boolean = true;

    chartSeries: any[] = [];
    colorScheme = {
      name: 'customScheme',
      selectable: true,
      group: 'Ordinal',
      domain: ['#007bff']  // Blue (normal points)
    };
  
    filteredReadings: RoomHumidity[] = [];
  
    constructor(private roomService: RoomService) {}
  
    ngOnInit(): void {
      // Optional: fetch initial data
    }
  
    currentPage: number = 1;
    pageSize: number = 10;
    totalPages: number = 1;
  
    get pagedReadings(): RoomHumidity[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredReadings.slice(startIndex, startIndex + this.pageSize);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
    
    goToNextPage(): void {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
    
  
    applyFilters(): void {
      if (!this.filterRoomId || !this.filterBatchId) {
        alert('Please provide both Room ID and Batch ID');
        return;
      }
  
      this.roomService.getRoomHumidity(this.filterRoomId, this.filterBatchId, this.showSpikesOnly)
        .subscribe({
          next: data => {
            // Inject RoomId and BatchId into each record
            this.filteredReadings = data.map(item => ({
              ...item,
              roomId: this.filterRoomId,
              batchId: this.filterBatchId
            }));
  
            this.currentPage = 1;
            this.totalPages = Math.ceil(this.filteredReadings.length / this.pageSize);
          },
  
          error: err => console.error('Error fetching room data', err)
        });
    }
}
