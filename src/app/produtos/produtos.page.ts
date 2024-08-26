import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstoqueService } from '../services/estoque.service'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  produtoForm: FormGroup;
  categorias: any[] = [];
  produtos: any[] = []; // Lista de produtos

  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
    private router: Router
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(0)]],
      preco: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      imagem: [''] // Opcional
    });
  }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarProdutos(); // Carrega os produtos quando a página é inicializada
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
  

  excluirProduto(produto: any) {
    // Lógica para excluir o produto
    this.estoqueService.excluirProduto(produto.id).subscribe(() => {
      console.log('Produto excluído com sucesso');
      this.carregarProdutos(); // Recarrega a lista de produtos após a exclusão
    });
  }
  
}
