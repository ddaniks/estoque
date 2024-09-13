<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string('nome'); // Nome do produto
            $table->text('descricao')->nullable(); // Descrição pode ser nula
            $table->integer('quantidade');
            $table->text('imageurl')->nullable(); 
            $table->decimal('preco', 10, 2); 
            $table->foreignId('categoria_id')
                  ->constrained('categorias')
                  ->onDelete('cascade'); // Chave estrangeira para categorias com cascata
            $table->boolean('modificado_no_mes')->default(false); // Indica se o produto foi modificado no mês
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};
