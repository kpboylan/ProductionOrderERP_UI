import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user-service/user.service';
import { UserTypeService, UserType } from '../user-service/user-type.service';
import { User } from '../user-model/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userEditForm: FormGroup;
  userTypes: UserType[] = []; // Array to hold UserTypes
  selectedUserTypeID: number | null = null; // Selected UserTypeID
  userId: number | null = null;

  user: User = {
    userID: 0,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    userTypeID: 0,
    active: false,
  };

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private userTypeService: UserTypeService,
    private route: ActivatedRoute, 
    private userService: UserService, 
    private http: HttpClient) {
    this.userEditForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      userTypeID: ['', Validators.required],
      active: [false]
    });
  }

  ngOnInit(): void {
    this.loadUserTypes();
    // Retrieve the userId from the route parameter
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    

    this.userService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        console.log('Fetched Product:', user);  // Add a log here to inspect the fetched product
        if (user) {
          this.userEditForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: user.password,
            userTypeID: user.userTypeID,
            active: user.active
          });
        } else {
          console.error('Product data is null or undefined');
        }
      },
      error: (err) => {
        console.error('Error fetching product:', err);  // Log error if request fails
      }
    });
  }

  onSubmit(): void {
    if (this.userEditForm.valid) {
      const userData = this.userEditForm.value;
      this.userId = +this.route.snapshot.paramMap.get('id')!;

      this.user = userData;
      this.user.userID = this.userId;

      console.log('Form Values:', userData);

      this.userService.updateUser(this.userId, userData).subscribe(response => {
        console.log('User created successfully', response);
        this.router.navigate(['/users']);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  loadUserTypes(): void {
    this.userTypeService.getUserTypes().subscribe(
      (data) => {
        this.userTypes = data; // Assign fetched data to the userTypes array
        console.log('UserType data: ', data);
      },
      (error) => {
        console.error('Error fetching UserTypes:', error);
      }
    );
  }

  onUserTypeChange(event: any): void {
    this.selectedUserTypeID = event.target.value;
    console.log('Selected UserTypeID:', this.selectedUserTypeID);
  }
}
