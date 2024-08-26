import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarProdutoPageRoutingModule } from './editar-produto-routing.module';

import { EditarProdutoPage } from './editar-produto.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarProdutoPageRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [EditarProdutoPage]
})
export class EditarProdutoPageModule {}
