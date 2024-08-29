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
            $table->float('preco');
            $table->integer('quantidade');
            $table->string('imageurl')->nullable();
            $table->unsignedBigInteger('categoria_id'); // categoria id
            $table->string('descricao')->nullable();//pode ser nulo
            $table->timestamps();

            // Adicionar foreign key constraint para 'categoria'
            $table->foreign('categoria_id')->references('id')->on('categorias')->onDelete('cascade');

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
