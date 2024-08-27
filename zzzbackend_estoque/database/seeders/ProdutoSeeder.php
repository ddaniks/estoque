<?php

namespace Database\Seeders;

use App\Models\Produto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProdutoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        produto::create([
            "name" => "Feijao preto",
            "preco" => 8.50,
            "quantidade"=>5,
            "categoria" => "Graos",
            "descricao" => "feijao tipo preto",
            "imageurl" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4X1qUfs08HBCS9HrA4BQilbM1f5FwFS4oVQ&s"
        ]);

        produto::create([
            "name" => "Arroz",
            "preco" => 15.50,
            "quantidade"=>10,
            "categoria" => "Graos",
            "descricao" => "Arroz 5Kg",
            "imageurl" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovmIBjReLCU4_QlbZhEcVFAtBNzRp8JXkyw&s"
        ]);
    }
}
