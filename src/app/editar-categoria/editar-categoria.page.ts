import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstoqueService } from '../services/estoque.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.page.html',
  styleUrls: ['./editar-categoria.page.scss'],
})
export class EditarCategoriaPage implements OnInit {
  categoriaForm: FormGroup;
  categoriaId: number | null = null; // Defina como null inicialmente

  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      icone: [''] // Opcional
    });
  }

  ngOnInit() {
    // Obtém o ID da categoria da rota e garante que seja um número
    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));

    // Verifica se categoriaId é válido antes de carregar
    if (this.categoriaId) {
      this.carregarCategoria();
    } else {
      console.error('Categoria ID inválido');
    }
  }

  carregarCategoria() {
    if (this.categoriaId) {
      this.estoqueService.getCategoria(this.categoriaId).subscribe(data => {
        // Verifica se a resposta não é nula antes de usar
        if (data) {
          this.categoriaForm.setValue({
            nome: data.nome || '', // Valor padrão se não existir
            descricao: data.descricao || '',
            icone: data.icone || '' // Valor padrão se não existir
          });
        } else {
          console.error('Dados da categoria não encontrados');
        }
      });
    }
  }

  salvarCategoria() {
    if (this.categoriaForm.valid && this.categoriaId) {
      this.estoqueService.atualizarCategoria(this.categoriaId, this.categoriaForm.value).subscribe(() => {
        this.router.navigate(['/categorias']); // Navega de volta para a lista de categorias
      });
    } else {
      console.error('Formulário inválido ou Categoria ID não definido');
    }
  }

  voltarParaCategorias() {
    this.router.navigate(['/categorias']); // Navega de volta para a lista de categorias
  }
}