<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\Api\MovimentacaoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::apiResource('categorias', CategoriaController::class);
Route::apiResource('produtos', ProdutoController::class);
Route::get('categorias/{categoria}/produtos', [ProdutoController::class, 'getProdutosPorCategoria']);

Route::get('/movimentacoes', [MovimentacaoController::class, 'index']);
Route::get('/movimentacoes/{id}', [MovimentacaoController::class, 'show']);
Route::post('/movimentacoes', [MovimentacaoController::class, 'store']);
Route::put('/movimentacoes/{id}', [MovimentacaoController::class, 'update']);
Route::delete('/movimentacoes/{id}', [MovimentacaoController::class, 'destroy']);
Route::put('/produtos/{id}', [ProdutoController::class, 'update']);

