import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstoqueService } from '../services/estoque.service';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.page.html',
  styleUrls: ['./adicionar-produto.page.scss'],
})
export class AdicionarProdutoPage implements OnInit {
  produtoForm: FormGroup;
  categorias: any[] = []; // Adicione aqui o tipo correto, se necessário

  constructor(private fb: FormBuilder, private estoqueService: EstoqueService) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      quantidade: ['', Validators.required],
      preco: ['', Validators.required],
      categoria: ['', Validators.required],
      imagem: ['']
    });
  }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    // Função para carregar categorias
    this.estoqueService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  adicionarProduto() {
    if (this.produtoForm.valid) {
      const novoProduto = this.produtoForm.value;
      this.estoqueService.adicionarProduto(novoProduto).subscribe(response => {
        console.log('Produto adicionado:', response);
        this.produtoForm.reset();
        // Navegar de volta ou mostrar uma mensagem de sucesso
      });
    }
  }
}
