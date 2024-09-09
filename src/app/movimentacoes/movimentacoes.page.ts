import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../services/estoque.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.page.html',
  styleUrls: ['./movimentacoes.page.scss'],
})
@Injectable({
  providedIn: 'root'
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

  registrarMovimentacao(tipo: string, detalhes: any) {
    const novaMovimentacao = {
      tipo, // Tipo da movimentação: "Adicionado", "Editado", "Excluído"
      detalhes,
      data: new Date()
    };
    this.movimentacoes.push(novaMovimentacao);
  }

  getMovimentacoes() {
    return this.movimentacoes;
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
