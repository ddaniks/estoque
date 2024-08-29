import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstoqueService } from '../services/estoque.service';
import { Router } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categoriaForm: FormGroup;
  categorias: any[] = [];

  constructor(private fb: FormBuilder, private estoqueService: EstoqueService,private router: Router) {
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

  editarCategoria(categoria: any) {
    // Lógica para editar a categoria
    console.log('Editar categoria:', categoria);
    // Aqui você pode abrir um modal ou redirecionar para uma página de edição
  }
  
  excluirCategoria(id: number) {
    // Lógica para excluir a categoria
    this.estoqueService.excluirCategoria(id).subscribe(() => {
      console.log('Categoria excluída com sucesso');
      this.carregarCategorias(); // Recarrega a lista de categorias após a exclusão
    });
  }
  

}
