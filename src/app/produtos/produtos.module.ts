import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutosPageRoutingModule } from './produtos-routing.module';

import { ProdutosPage } from './produtos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutosPageRoutingModule
  ],
  declarations: [ProdutosPage]
})
export class ProdutosPageModule {}

export interface produto{
  id: number;
  name:string;
  preco:number;
  imageurl:string;
  categoria:string;
  descricao:string;
  quantidade: number;
  icone: string;
  categoria_id: number;
}
