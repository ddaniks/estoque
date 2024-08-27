<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    // Listar todos os produtos
    public function index()
    {
        return Produto::all();
    }

    // Criar um novo produto
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'preco' => 'required|numeric',
            'categoria_id' => 'required|exists:categorias,id',
        ]);

        $produto = Produto::create($request->all());

        return response()->json($produto, 201);
    }

    // Exibir um produto específico
    public function show($id)
    {
        $produto = Produto::find($id);

        if ($produto) {
            return response()->json($produto);
        }

        return response()->json(['message' => 'Produto não encontrado'], 404);
    }

    // Atualizar um produto existente
    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'preco' => 'required|numeric',
            'categoria_id' => 'required|exists:categorias,id',
        ]);

        $produto = Produto::find($id);

        if ($produto) {
            $produto->update($request->all());
            return response()->json($produto);
        }

        return response()->json(['message' => 'Produto não encontrado'], 404);
    }

    // Deletar um produto
    public function destroy($id)
    {
        $produto = Produto::find($id);

        if ($produto) {
            $produto->delete();
            return response()->json(['message' => 'Produto deletado com sucesso']);
        }

        return response()->json(['message' => 'Produto não encontrado'], 404);
    }
}
