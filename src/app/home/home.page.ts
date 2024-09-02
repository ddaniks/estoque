import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  

  constructor(private http: HttpClient, private router: Router) {
    http.get('http://localhost:8000/api/produtos').subscribe(console.log);
  }

  

  adicionarCategoria() {
    this.router.navigate(['/categorias']); // Navega para a página de cadastro de categoria
  }

  adicionarProduto() {
    this.router.navigate(['/produtos']); // Navega para a página de cadastro de produto
  }

}
