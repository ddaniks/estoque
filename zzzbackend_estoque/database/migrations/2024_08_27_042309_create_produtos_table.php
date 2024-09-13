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
            $table->string('name');
            $table->text('descricao')->nullable(); // Descrição pode ser nula
            $table->integer('quantidade');
            $table->string('imageurl')->nullable();
            $table->decimal('preco', 10, 2); // Formato para valores monetários
            $table->foreignId('categoria_id')->constrained('categorias'); // Chave estrangeira para categorias
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
