import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstoqueService } from '../services/estoque.service'; // Ajuste o caminho se necessário
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { produto } from './produtos.module';
import { DetalhesComponent } from '../detalhes-produto/detalhes.component';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  produtoForm: FormGroup;
  categorias: any[] = [];
  produtos: any[] = []; // Lista de produtos

 
  produtos$: Observable<produto[]> = new Observable<produto[]>();


  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
    private router: Router,
    private loadingCtrl:LoadingController,
    private modalCtrl:ModalController,
    private toastController: ToastController, 
    private alertController: AlertController  
  ) {
    this.produtoForm = this.fb.group({
      name: ['', Validators.required],
      descricao: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(0)]],
      preco: [0, [Validators.required, Validators.min(0)]],
      categoria_id: ['', Validators.required],
      imageurl: [''] // Opcional
    });
  }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarProdutos();
  }

  voltarParaHome() {
    this.router.navigate(['/home']); // Navega para a página Home
  }

  carregarCategorias() {
    this.estoqueService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  carregarProdutos() {
    this.estoqueService.getProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  adicionarProduto() {
    if (this.produtoForm.valid) {
      const novoProduto = this.produtoForm.value;
      this.estoqueService.adicionarProduto(novoProduto).subscribe(response => {
        console.log('Produto adicionado:', response);
        this.produtoForm.reset();
        this.router.navigate(['/dashboard']); // Navega para a página Dashboard ou qualquer outra página desejada
      });
    }
  }

  abrirFormulario() {
    this.router.navigate(['/adicionar-produto']);  // Navega para a página de adicionar produto
  }

  editarProduto(produto: any) {
    this.router.navigate(['/editar-produto', produto.id]);
  }
  

  excluirProduto2(produto: any) {
    // Lógica para excluir o produto
    this.estoqueService.excluirProduto(produto.id).subscribe(() => {
      console.log('Produto excluído com sucesso');
      this.carregarProdutos(); // Recarrega a lista de produtos após a exclusão
    });
  }

  // Método para excluir o produto
  excluirProduto(produto: any) {
    this.estoqueService.excluirProduto(produto.id).subscribe(
      response => {
        console.log('Produto excluído:', response);
        this.carregarProdutos(); // Recarregar a lista de produtos após a exclusão
      },
      error => {
        console.error('Erro ao excluir produto:', error);
      }
    );
  }

  // Método para confirmar a exclusão
  async confirmarExclusao(produto: any) {
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
            this.excluirProduto(produto.id); // Chama a função para excluir
          },
        },
      ],
    });
    await alert.present();
  }

  




  async openDetalhesModal(produto:produto){
    const modal = await this.modalCtrl.create({
      component:DetalhesComponent,
      componentProps:{produto},
    });
    modal.present();
  }
  
}
