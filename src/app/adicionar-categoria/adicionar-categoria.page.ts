import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstoqueService } from '../services/estoque.service';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-adicionar-categoria',
  templateUrl: './adicionar-categoria.page.html',
  styleUrls: ['./adicionar-categoria.page.scss'],
})
export class AdicionarCategoriaPage implements OnInit {
  categoriaForm: FormGroup;
  categorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      name: ['', Validators.required],
      descricao: ['', Validators.required],
      icone: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  voltarParaHome() {
    this.router.navigate(['/home']); // Navega para a página Home
  }

  adicionarCategoria() {
    if (this.categoriaForm.valid) {
      this.presentLoading(); // Mostra um loading enquanto a requisição é processada
      const novaCategoria = this.categoriaForm.value;
      this.estoqueService.adicionarCategoria(novaCategoria).subscribe(response => {
        console.log('Categoria adicionada:', response);
        this.categoriaForm.reset();
        this.router.navigate(['/categorias']); // Navega de volta para a página de categorias
      });
    }
  }
  
  // Método para mostrar um loading
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Adicionando Categoria...',
      duration: 2000
    });
    await loading.present();
  }
    

}
