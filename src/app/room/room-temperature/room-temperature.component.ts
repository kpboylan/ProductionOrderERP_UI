import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../room-service/room-service';
import { RoomTemperature } from '../room-model/room-temperature.model';

@Component({
  selector: 'app-room-temperature',
  templateUrl: './room-temperature.component.html',
  styleUrls: ['./room-temperature.component.css']
})
export class RoomTemperatureComponent implements OnInit {
  form: FormGroup;
  filteredReadings: RoomTemperature[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private fb: FormBuilder, private roomService: RoomService) {
    this.form = this.fb.group({
      roomId: ['', Validators.required],
      batchId: ['', Validators.required],
      showAnomaliesOnly: [true]
    });
  }

  ngOnInit(): void {}

  get pagedReadings(): RoomTemperature[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredReadings.slice(startIndex, startIndex + this.pageSize);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  applyFilters(): void {
    if (this.form.invalid) {
    this.form.markAllAsTouched(); // 👈 This is the key!
    return;
    }
    const { roomId, batchId, showAnomaliesOnly } = this.form.value;

    /* if (!roomId || !batchId) {
      alert('Please provide both Room ID and Batch ID');
      return;
    } */

    this.roomService.getRoomTemperatures(roomId, batchId, showAnomaliesOnly).subscribe({
      next: data => {
        this.filteredReadings = data.map(item => ({
          ...item,
          roomId,
          batchId
        }));
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.filteredReadings.length / this.pageSize);
      },
      error: err => console.error('Error fetching room data', err)
    });
  }
}
