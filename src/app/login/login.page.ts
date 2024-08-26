import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string ='';
  senha: string ='';

  constructor(private router: Router) {}

  login() {
    // Lógica de autenticação
    // Redirecionar para a tela de dashboard após o login
    this.router.navigate(['/dashboard']);
  }
}
