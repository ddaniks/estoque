<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Models\Movimentacao; 
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    public function index(){
        $produtos = Produto::all();
        return response()->json($produtos);
        $movimentacoes = Movimentacao::all();
    return response()->json($movimentacoes);
    }

    // Criar um novo produto
   

    public function store(Request $request)
    {  
        // Validação
        $request->validate([
            'name' => 'required|string|max:255',
            'quantidade' => 'required|numeric',
            'descricao' => 'nullable|string',
            'imageurl' => 'nullable|url',
            'preco' => 'required|numeric',
            'categoria_id' => 'required|exists:categorias,id',
        ]);
    
        // Salvando no BD
        $produto = Produto::create([
            'name' => $request->name,
            'quantidade' => $request->quantidade,
            'descricao' => $request->descricao,
            'imageurl' => $request->imageurl,
            'preco' => $request->preco,
            'categoria_id' => $request->categoria_id,
        ]);
    
        // Retorna resposta
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
        'name' => 'required|string|max:255',
        'quantidade' => 'required|numeric',
        'descricao' => 'nullable|string',
        'imageurl' => 'nullable|string',
        'preco' => 'required|numeric',
        'categoria_id' => 'required|exists:categorias,id',
        'imageurl' => 'nullable|url'
    ]);

    $produto = Produto::find($id);

    if ($produto) {
        // Calcular a diferença na quantidade
        $novaQuantidade = $request->input('quantidade');
        $diferencaQuantidade = $novaQuantidade - $produto->quantidade;

        // Atualizar o produto
        $produto->update($request->all());

        // Criar movimentação
        if ($diferencaQuantidade != 0) {
            Movimentacao::create([
                'produto_id' => $produto->id,
                'quantidade' => $diferencaQuantidade,
                'tipo' => $diferencaQuantidade > 0 ? 'adicionado' : 'retirado',
                'detalhes' => 'Atualização de produto',
            ]);
        }

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


    public function getProdutosPorCategoria($categoriaId)
{
    $produtos = Produto::where('categoria_id', $categoriaId)->get();
    return response()->json($produtos);
}


}
