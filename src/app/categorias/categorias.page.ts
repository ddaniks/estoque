import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstoqueService } from '../services/estoque.service';
import { Router } from '@angular/router'; 
import { ModalController } from '@ionic/angular';
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
    private router: Router){
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
    // Aqui esta redirecionando para uma página de edição
    this.router.navigate(['/editar-categoria',categoria.id]);
  }
  
  excluirCategoria(id: number) {
    // Lógica para excluir a categoria
    this.estoqueService.excluirCategoria(id).subscribe(() => {
      console.log('Categoria excluída com sucesso');
      this.carregarCategorias(); // Recarrega a lista de categorias após a exclusão
    });
  }
  

}
