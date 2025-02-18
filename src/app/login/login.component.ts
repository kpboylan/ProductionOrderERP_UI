// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import necessary modules
import { LoginService } from './login-service/login.service';
import { Router } from '@angular/router';  // Import Router if you want to navigate after login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;  // The form group that will hold our form controls
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,  // Inject FormBuilder
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Initialize the login form using FormBuilder
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],  // Username field with required validation
      Password: ['', [Validators.required]],  // Password field with required validation
    });
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Handle form submission
  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Invalid form: ', this.loginForm.invalid);
      return;  // If the form is invalid, prevent submission
    }

    // Create the authData object using the form values
    const authData = this.loginForm.value;
    console.log('AuthData:', authData);  

    // Call the AuthService to perform login
    this.loginService.login(authData).subscribe(
      (response) => {
        console.log('Login successful', response);
        console.log('Returned token: ', response.token);
        // Handle response (e.g., store token or redirect)
        localStorage.setItem('authToken', JSON.stringify(response.token));  // Adjust according to your API response

        this.router.navigate(['/home']);  // Navigate to home or another page after successful login
      },
      (error) => {
        console.error('Login failed', error);
        console.error('Error details:', error.error);
        this.errorMessage = 'Invalid username or password';
        alert('Login failed. Please try again.');
      }
    );
  }
}
