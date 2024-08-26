import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importar Router
import { EstoqueService } from '../services/estoque.service'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  estabelecimentos: any[] = [];
  estabelecimentoSelecionado: any;

  constructor(private estoqueService: EstoqueService, private router: Router) {} // Adicionar Router ao construtor

  ngOnInit() {
    this.estoqueService.getCategorias().subscribe(data => {
      this.estabelecimentos = data;
    });
  }

  voltarParaHome() {
    this.router.navigate(['/home']); // Navega para a página Home
  }

  adicionarCategoria() {
    this.router.navigate(['/categorias']); // Navega para a página de cadastro de categoria
  }

  adicionarProduto() {
    this.router.navigate(['/produtos']); // Navega para a página de cadastro de produto
  }
}
