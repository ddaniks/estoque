import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarProdutoPageRoutingModule } from './adicionar-produto-routing.module';

import { AdicionarProdutoPage } from './adicionar-produto.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarProdutoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdicionarProdutoPage]
})
export class AdicionarProdutoPageModule {}
