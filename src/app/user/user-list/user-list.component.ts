import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { User } from '../user-model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  includeInactive: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadActiveUsers();
  }

  loadActiveUsers(): void {
    this.userService.getActiveUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  applyChanges() {
    if (this.includeInactive)
      {
        this.loadAllUsers();
      }
      else
      {
        this.loadActiveUsers();
      }
  }

  onRowClick(userId: number) {
    // Handle row click logic (for example, navigate to user details page)
  }
}
