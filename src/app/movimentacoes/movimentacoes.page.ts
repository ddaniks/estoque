import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../services/estoque.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.page.html',
  styleUrls: ['./movimentacoes.page.scss'],
})
export class MovimentacoesPage implements OnInit {
  movimentacoes: any[] = [];
  movimentacaoAberta: any = null;

  constructor(
    private estoqueService: EstoqueService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.carregarMovimentacoes();
  }

  voltarParaHome() {
    this.router.navigate(['/home']); // Navega para a página Home
  }

  carregarMovimentacoes() {
    this.estoqueService.getMovimentacoes().subscribe(data => {
      console.log('Dados de movimentações recebidos:', data);
      this.movimentacoes = data;
    }, error => {
      console.error('Erro ao buscar movimentações:', error);
    });
  }
  

  toggleDetalhes(movimentacao: any) {
    if (this.movimentacaoAberta === movimentacao) {
      this.movimentacaoAberta = null;
    } else {
      this.movimentacaoAberta = movimentacao;
    }
  }

  editarProduto(produto: any) {
    this.estoqueService.atualizarProduto(produto.id, produto).subscribe(() => {
      this.carregarMovimentacoes();
    });
  }

}
