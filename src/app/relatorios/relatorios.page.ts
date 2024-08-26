import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../services/estoque.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
})
export class RelatoriosPage implements OnInit {
  relatorios: any[] = [];

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit() {
    this.carregarRelatorios();
  }

  carregarRelatorios() {
    // Carregue os relatórios se houver
    // Exemplo: this.estoqueService.getRelatorios().subscribe(data => this.relatorios = data);
  }

  gerarRelatorio() {
    // Lógica para gerar um novo relatório
  }

  visualizarRelatorio(relatorio: any) {
    // Lógica para visualizar o relatório selecionado
  }
}
