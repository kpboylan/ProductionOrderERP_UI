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
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers(this.includeInactive).subscribe((data: User[]) => {
      this.users = data;
    });
  }

  applyChanges() {
    this.fetchUsers();
  }

  onRowClick(userId: number) {
    // Handle row click logic (for example, navigate to user details page)
  }
}
