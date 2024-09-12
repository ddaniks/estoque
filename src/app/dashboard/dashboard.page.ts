import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstoqueService } from '../services/estoque.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  categorias: any[] = [];
  produtos: any[] = [];
  categoriaSelecionada: any;
  produtosSelecionados: any[] = [];
  valorTotalCategoria: number = 0;
  lucroCalculado: number = 0;

  constructor(private estoqueService: EstoqueService, private router: Router) {}

  ngOnInit() {
    // Carregar categorias e produtos
    this.estoqueService.getCategorias().subscribe(data => {
      this.categorias = data;
    });

    this.estoqueService.getProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }

  adicionarCategoria() {
    this.router.navigate(['/categorias']);
  }

  adicionarProduto() {
    this.router.navigate(['/produtos']);
  }

  onCategoriaChange() {
    if (this.categoriaSelecionada) {
      this.produtosSelecionados = this.produtos.filter(produto => produto.categoria_id === this.categoriaSelecionada.id);
      this.calcularValorTotalCategoria();
      this.calcularLucro();
    }
  }

  calcularValorTotalCategoria() {
    this.valorTotalCategoria = this.produtosSelecionados.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
  }

  calcularLucro() {
    const dataAtual = new Date();
    const inicioMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    const produtosModificadosNoMes = this.produtos.filter(produto => {
      const dataModificacao = new Date(produto.dataModificacao);
      return dataModificacao >= inicioMes;
    });
    this.lucroCalculado = produtosModificadosNoMes.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
  }
}
