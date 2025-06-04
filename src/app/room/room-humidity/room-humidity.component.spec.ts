import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomHumidityComponent } from './room-humidity.component';

describe('RoomHumidityComponent', () => {
  let component: RoomHumidityComponent;
  let fixture: ComponentFixture<RoomHumidityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomHumidityComponent]
    });
    fixture = TestBed.createComponent(RoomHumidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
