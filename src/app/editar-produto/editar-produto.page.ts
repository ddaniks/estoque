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
      name: ['', Validators.required],
      descricao: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(0)]],
      preco: [0, [Validators.required, Validators.min(0)]],
      categoria_id: ['', Validators.required],
      imageurl: ['', [Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.produtoId = id ? Number(id) : null;

    if (this.produtoId && !isNaN(this.produtoId)) {
      this.carregarProduto();
    } else {
      console.error('Produto ID inválido');
      this.router.navigate(['/produtos']);
    }
    this.carregarCategorias();
  }

 carregarProduto() {
    if (this.produtoId) {
      this.estoqueService.getProduto(this.produtoId).subscribe(
        data => {
          if (data) {
            this.produtoForm.setValue({
              name: data.name || '',
              descricao: data.descricao || '',
              quantidade: data.quantidade !== undefined ? data.quantidade : 0,
              preco: data.preco !== undefined ? data.preco : 0,
              categoria_id: data.categoria_id || this.categorias[0]?.id || '',
              imageurl: data.imageurl || '',
            });
          } else {
            console.error('Dados do produto não encontrados');
            this.router.navigate(['/produtos']);
          }
        },
        error => {
          console.error('Erro ao carregar o produto:', error);
          this.router.navigate(['/produtos']);
        }
      );
    }
  }
  

  carregarCategorias() {
    this.estoqueService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  salvarProduto() {
    if (this.produtoForm.valid && this.produtoId !== null) {
      console.log(this.produtoForm.value); // Adicione isso para verificar os dados
      this.estoqueService.atualizarProduto(this.produtoId, this.produtoForm.value).subscribe(() => {
        this.router.navigate(['/produtos']).then(() => window.location.reload());
      }, error => {
        console.error('Erro ao salvar o produto:', error);
      });
    } else {
      console.error('Produto ID inválido');
      this.router.navigate(['/produtos']);
    }
  }
  

  voltarParaProdutos() {
    this.router.navigate(['/produtos']); // Navega de volta para a lista de categorias
  }

}
