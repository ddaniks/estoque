import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EstoqueService } from '../services/estoque.service';
import { produto } from '../produtos/produtos.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-detalhes-categoria',
  templateUrl: './detalhes-categoria.component.html',
  styleUrls: ['./detalhes-categoria.component.scss'],
})
export class DetalhesCategoriaComponent implements OnInit {
  @Input() categoria!: produto;  // Defina o tipo correto para a categoria
  produtos: produto[] = [];

  constructor(
    private modalCtrl: ModalController,
    private estoqueService: EstoqueService
  ) {}

  ngOnInit() {
    this.getProdutosPorCategoria();
  }

  getProdutosPorCategoria() {
    this.estoqueService.getProdutosPorCategoria(this.categoria.id)
      .subscribe({
        next: (data: produto[]) => {
          this.produtos = data; 
        },
        error: (err: any) => {
          console.error('Erro ao carregar produtos', err);
        }
      });
  }

  fecharModal() {
    this.modalCtrl.dismiss();
  }
}
@NgModule({
  declarations: [DetalhesCategoriaComponent],
  imports: [
    CommonModule,
    IonicModule,
    // outros módulos necessários
  ],
  exports: [DetalhesCategoriaComponent],
})
export class DetalhesModule { }