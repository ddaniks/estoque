import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstoqueService } from '../services/estoque.service';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.page.html',
  styleUrls: ['./adicionar-produto.page.scss'],
})
export class AdicionarProdutoPage implements OnInit {
  produtoForm: FormGroup;
  categorias: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
    private loadingCtrl: LoadingController){
    this.produtoForm = this.fb.group({
      name: ['', Validators.required],
      descricao: ['', Validators.required],
      quantidade: ['', Validators.required],
      preco: ['', Validators.required],
      categoria_id: ['', Validators.required],
      imageurl: ['']
    });
  }

  ngOnInit() {
    this.carregarCategorias();
   
  };

  carregarCategorias() {
    // Função para carregar categorias
    this.estoqueService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  
  async submitProduto() {
    if (this.produtoForm.valid) {
      const loading = await this.loadingCtrl.create({ message: 'Loading...' });
      await loading.present();

      console.log('Dados do produto:', this.produtoForm.value);

      this.estoqueService.adicionarProduto(this.produtoForm.value)
        .pipe(take(1))
        .subscribe({
          next: (produto) => {
            console.log('Produto adicionado:', produto);
            this.produtoForm.reset();
            loading.dismiss();
            // Navegar de volta ou mostrar uma mensagem de sucesso
          },
          error: (err) => {
            console.error('Erro ao adicionar produto:', err);
            loading.dismiss();
            // Mostrar uma mensagem de erro
          }
        });
    }
  }


}
