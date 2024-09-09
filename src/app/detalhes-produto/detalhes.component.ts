import { Component, Input, NgModule, OnInit } from '@angular/core';
import { produto } from '../produtos/produtos.module';
import { ModalController, AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EstoqueService } from '../services/estoque.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss'],
})
export class DetalhesComponent implements OnInit {
  @Input() produto!: produto;

  constructor(
    private modalCtrl: ModalController,
    private estoqueService: EstoqueService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  // Método para confirmar a exclusão do produto
  async confirmarExclusao(produto: produto) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Tem certeza que deseja excluir o produto ${produto.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.excluirProduto(produto.id); // Passa o ID do produto
          },
        },
      ],
    });
    await alert.present();
  }

  // Método para excluir o produto
  excluirProduto(id: number) {
    this.estoqueService.excluirProduto(id).subscribe(
      () => {
        console.log('Produto excluído com sucesso');
        this.closeModal(); // Fecha o modal após a exclusão
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao excluir produto:', error.message);
      }
    );
  }
}

@NgModule({
  declarations: [DetalhesComponent],
  imports: [
    CommonModule,
    IonicModule,
    // outros módulos necessários
  ],
  exports: [DetalhesComponent],
})
export class DetalhesModule {}
