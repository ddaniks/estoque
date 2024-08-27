<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    // Listar todas as categorias
    public function index(){
        $categoria = Categoria::all();
        return response()->json($categoria);
    }

    // Criar uma nova categoria
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
        ]);

        $categoria = Categoria::create($request->all());

        return response()->json($categoria, 201);
    }

    // Exibir uma categoria específica
    public function show($id)
    {
        $categoria = Categoria::find($id);

        if ($categoria) {
            return response()->json($categoria);
        }

        return response()->json(['message' => 'Categoria não encontrada'], 404);
    }

    // Atualizar uma categoria existente
    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
        ]);

        $categoria = Categoria::find($id);

        if ($categoria) {
            $categoria->update($request->all());
            return response()->json($categoria);
        }

        return response()->json(['message' => 'Categoria não encontrada'], 404);
    }

    // Deletar uma categoria
    public function destroy($id)
    {
        $categoria = Categoria::find($id);

        if ($categoria) {
            $categoria->delete();
            return response()->json(['message' => 'Categoria deletada com sucesso']);
        }

        return response()->json(['message' => 'Categoria não encontrada'], 404);
    }
}
