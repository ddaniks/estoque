import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../services/estoque.service';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.page.html',
  styleUrls: ['./movimentacoes.page.scss'],
})
export class MovimentacoesPage implements OnInit {
  movimentacoes: any[] = [];

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit() {
    this.carregarMovimentacoes();
  }

  carregarMovimentacoes() {
    this.estoqueService.getMovimentacoes().subscribe((data : any[]) => {
      this.movimentacoes = data;
    });
  }

  adicionarMovimentacao() {
    // Lógica para adicionar uma nova movimentação
  }

  editarMovimentacao(movimentacao: any) {
    // Lógica para editar a movimentação selecionada
  }

  excluirMovimentacao(movimentacao: any) {
    // Lógica para excluir a movimentação selecionada
  }
}
