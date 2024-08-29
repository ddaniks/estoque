import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {produto} from '../produtos/produtos.module';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private apiUrl = 'http://localhost:8000/api'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  // Método para obter categorias
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`);
  }

  // Método para obter produtos
  getProdutos(): Observable<produto[]> {
    return this.http.get<produto[]>(`${this.apiUrl}/produtos`);
  }

  // Método para adicionar uma nova categoria
  adicionarCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categorias`, categoria);
  }

  // Método para adicionar um novo produto
  adicionarProduto(produto: any): Observable<produto> {
    return this.http.post<produto>(`${this.apiUrl}/produtos`, produto);
  }

  // Método para obter movimentações (adicionar esse método se necessário)
  getMovimentacoes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/movimentacoes`);
  }

  // Método para editar um produto
  editarProduto(produto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/produtos/${produto.id}`, produto);
  }

  // Método para excluir uma categoria
  excluirCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categorias/${id}`);
  }

  // Método para excluir um produto
  excluirProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/produtos/${id}`);
  }

  // Método para excluir uma movimentação (adicionar se necessário)
  excluirMovimentacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/movimentacoes/${id}`);
  }
  // Método para obter uma categoria pelo ID
getCategoria(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/categorias/${id}`);
}

  // Método para atualizar uma categoria
  atualizarCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/categorias/${id}`, categoria);
  }

  // Método para obter um produto por ID
  getProduto(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/produtos/${id}`);
  }

  // Método para atualizar um produto existente
  atualizarProduto(id: number, produto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/produtos/${id}`, produto);
  }


}
