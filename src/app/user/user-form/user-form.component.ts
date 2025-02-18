import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user-service/user.service';
import { UserTypeService, UserType } from '../user-service/user-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    userForm: FormGroup;
    userTypes: UserType[] = []; // Array to hold UserTypes
    selectedUserTypeID: number | null = null; // Selected UserTypeID
  
    constructor(private fb: FormBuilder, 
      private router: Router, 
      private userService: UserService, 
      private userTypeService: UserTypeService,
      private http: HttpClient) {
      this.userForm = this.fb.group({
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
  
    onSubmit(): void {
      if (this.userForm.valid) {
        const userData = this.userForm.value;
  
        console.log('Form Values:', userData); 
  
        this.userService.createUser(userData).subscribe(response => {
          console.log('User created successfully', response);
          this.router.navigate(['/users']);
        });
      } else {
        console.log('Form is invalid');
      }
    }
}
