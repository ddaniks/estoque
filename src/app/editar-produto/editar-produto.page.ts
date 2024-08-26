import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstoqueService } from '../services/estoque.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.page.html',
  styleUrls: ['./editar-produto.page.scss'],
})
export class EditarProdutoPage implements OnInit {
  produtoForm: FormGroup;
  produtoId: number | null = null;
  categorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(0)]],
      preco: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.produtoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.produtoId) {
      this.carregarProduto();
    } else {
      console.error('Produto ID inválido');
    }
    this.carregarCategorias();
  }

  carregarProduto() {
    if (this.produtoId) {
      this.estoqueService.getProduto(this.produtoId).subscribe(data => {
        if (data) {
          this.produtoForm.setValue({
            nome: data.nome || '',
            descricao: data.descricao || '',
            quantidade: data.quantidade || 0,
            preco: data.preco || 0,
            categoria: data.categoria || ''
          });
        } else {
          console.error('Dados do produto não encontrados');
        }
      });
    }
  }

  carregarCategorias() {
    this.estoqueService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  salvarProduto() {
    if (this.produtoForm.valid && this.produtoId) {
      this.estoqueService.atualizarProduto(this.produtoId, this.produtoForm.value).subscribe(() => {
        this.router.navigate(['/produtos']); // Navega de volta para a lista de produtos
      });
    } else {
      console.error('Formulário inválido ou Produto ID não definido');
    }
  }
}
