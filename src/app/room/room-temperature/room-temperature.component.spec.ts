import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTemperatureComponent } from './room-temperature.component';

describe('RoomTemperatureComponent', () => {
  let component: RoomTemperatureComponent;
  let fixture: ComponentFixture<RoomTemperatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomTemperatureComponent]
    });
    fixture = TestBed.createComponent(RoomTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
