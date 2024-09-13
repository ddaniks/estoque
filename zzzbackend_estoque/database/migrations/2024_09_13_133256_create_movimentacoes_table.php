<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMovimentacoesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movimentacoes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('produto_id');
            $table->integer('quantidade');
            $table->string('tipo'); // 'adicionado', 'editado', 'excluído'
            $table->text('detalhes')->nullable(); // Detalhes sobre a alteração
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('produto_id')->references('id')->on('produtos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movimentacoes');
    }
}
