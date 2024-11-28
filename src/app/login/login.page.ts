import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  isLogin = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  private apiUrl = 'http://localhost:8000/api'; // Defina a URL da API aqui

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { // Adicione o Router ao construtor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  voltarParaHome() {
    this.router.navigate(['/home']); // Navega para a página Home
  }

  login() {
    if (this.loginForm.valid) {
      this.http.post(`${this.apiUrl}/login`, this.loginForm.value).subscribe((response: any) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token); // Salve o token no localStorage
        this.router.navigate(['/home']).then(() => {
          window.location.reload(); // Recarregue a página após a navegação
        });
      }, error => {
        console.error('Login error', error);
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.http.post(`${this.apiUrl}/register`, this.registerForm.value).subscribe(response => {
        console.log('Registration successful', response);
      }, error => {
        console.error('Registration error', error);
      });
    }
  }
}