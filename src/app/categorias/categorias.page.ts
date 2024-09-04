import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstoqueService } from '../services/estoque.service';
import { Router } from '@angular/router'; 
import { ModalController, AlertController } from '@ionic/angular';
import { DetalhesCategoriaComponent } from '../detalhes-categoria/detalhes-categoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categoriaForm: FormGroup;
  categorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
    private modalController: ModalController,
    private router: Router,
    private alertController: AlertController
  ) {
    this.categoriaForm = this.fb.group({
      name: ['', Validators.required],
      descricao: ['', Validators.required],
      icone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.carregarCategorias();
  }

  voltarParaHome() {
    this.router.navigate(['/home']); // Navega para a página Home
  }

  abrirFormulario() {
    this.router.navigate(['/adicionar-categoria']);  // Navega para a página de adicionar produto
  }

  adicionarCategoria() {
    if (this.categoriaForm.valid) {
      const novaCategoria = this.categoriaForm.value;
      this.estoqueService.adicionarCategoria(novaCategoria).subscribe(response => {
        console.log('Categoria adicionada:', response);
        this.categoriaForm.reset();
        this.carregarCategorias(); // Recarrega a lista de categorias após adicionar
      });
    }
  }

  carregarCategorias() {
    this.estoqueService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  async openDetalhesModal(categoriaId: number) {
    const modal = await this.modalController.create({
      component: DetalhesCategoriaComponent, // Componente do modal
      componentProps: {
        categoria: categoriaId // Passa a categoria selecionada para o modal
      }
    });
    return await modal.present();
  }

  editarCategoria(categoria: any) {
    // Lógica para editar a categoria
    console.log('Editar categoria:', categoria);
    this.router.navigate(['/editar-categoria', categoria.id]);
  }

  async excluirCategoria(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja excluir esta categoria? , Todos os produtos desta categoria serão deletados ',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão cancelada');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.estoqueService.excluirCategoria(id).subscribe(() => {
              console.log('Categoria excluída com sucesso');
              this.carregarCategorias(); // Recarrega a lista de categorias após a exclusão
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
