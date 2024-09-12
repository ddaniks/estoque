import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'movimentacoes',
    loadChildren: () => import('./movimentacoes/movimentacoes.module').then( m => m.MovimentacoesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'adicionar-produto',
    loadChildren: () => import('./adicionar-produto/adicionar-produto.module').then( m => m.AdicionarProdutoPageModule)
  },
  {
    path: 'editar-categoria',
    loadChildren: () => import('./editar-categoria/editar-categoria.module').then( m => m.EditarCategoriaPageModule)
  },
  {
    path: 'editar-produto',
    loadChildren: () => import('./editar-produto/editar-produto.module').then( m => m.EditarProdutoPageModule)
  },
  {
    path: 'adicionar-categoria',
    loadChildren: () => import('./adicionar-categoria/adicionar-categoria.module').then( m => m.AdicionarCategoriaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
