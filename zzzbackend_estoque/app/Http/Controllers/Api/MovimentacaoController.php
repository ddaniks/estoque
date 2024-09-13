<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;


use App\Models\Movimentacao;
use Illuminate\Http\Request;

class MovimentacaoController extends Controller
{
    public function index()
    {
        return Movimentacao::with('produto')->get(); // Pega todas as movimentações com detalhes do produto
    }

    public function store(Request $request)
    {
        $movimentacao = Movimentacao::create($request->all());
        return response()->json($movimentacao, 201);
    }

    public function show($id)
    {
        return Movimentacao::with('produto')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $movimentacao = Movimentacao::findOrFail($id);
        $movimentacao->update($request->all());
        return response()->json($movimentacao, 200);
    }

    public function destroy($id)
    {
        Movimentacao::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}


