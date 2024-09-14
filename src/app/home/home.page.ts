import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isLoggedIn = false; // Variável de estado para controlar a visibilidade do botão de login

  constructor(private http: HttpClient, private router: Router) {
    http.get('http://localhost:8000/api/produtos').subscribe(console.log);
  }

  ngOnInit() {
    // Verifique o estado de login do usuário (isso pode ser feito verificando um token ou uma variável de sessão)
    this.isLoggedIn = !!localStorage.getItem('token'); // Exemplo: verificar se há um token no localStorage
  }

  adicionarCategoria() {
    // Lógica para adicionar categoria
    this.router.navigate(['/categorias']); // Navega para a página de cadastro de categoria
  }

  adicionarProduto() {
    // Lógica para adicionar produto
    this.router.navigate(['/produtos']); // Navega para a página de cadastro de produto
  }

  logout() {
    localStorage.removeItem('token'); // Remova o token do localStorage
    this.isLoggedIn = false; // Atualize o estado de login
    this.router.navigate(['/home']); // Redirecione para a página de login
  }
}
