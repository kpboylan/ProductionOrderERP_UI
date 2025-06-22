// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import necessary modules
import { LoginService } from './login-service/login.service';
import { Router } from '@angular/router';  // Import Router if you want to navigate after login
import { jwtDecode } from 'jwt-decode';
import { FeatureFlagService } from '../feature-flag/feature-flag.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;  
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,  
    private loginService: LoginService,
    private router: Router,
    private featureFlagService: FeatureFlagService,
  ) {
    this.loginForm = this.fb.group({
      loginUsername: ['', [Validators.required]],
      loginPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      loginUsername: ['', [Validators.required]], 
      loginPassword: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Invalid form: ', this.loginForm.invalid);
      return;  
    }

    const authData = this.loginForm.value;

    this.loginService.login(authData).subscribe(
      (response) => {
        console.log('Login successful', response);

        localStorage.setItem('authToken', response.token); 
        const token = response.token; 

        console.log('Auth token:', response.token.result);

        const decodedToken: any = jwtDecode(token);
        const userRole = decodedToken['role'];
        const tenantId = decodedToken['tenant_id'];
        const tenantName = decodedToken['tenant_name'];

        console.log('Decoded user role:', userRole);
        console.log('Decoded tenant:', tenantId, tenantName);

        localStorage.setItem('userRole', userRole); 
        
        this.featureFlagService.clearFlags();
        this.featureFlagService.getFeatureFlags().subscribe();

        this.router.navigate(['/home']); 
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
