import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarCategoriaPage } from './editar-categoria.page';

const routes: Routes = [
  {
    path: ':id',
    component: EditarCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarCategoriaPageRoutingModule {}
