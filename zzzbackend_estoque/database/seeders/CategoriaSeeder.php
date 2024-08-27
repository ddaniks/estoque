<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        categoria::create([
            "name" => "Bebida",
            "descricao" => "refrigerantes sucos alcolicas",
            "icone" => "https://elements-resized.envatousercontent.com/elements-
            cover-images/5cbfc126-7764-459c-abe0-56aecf96fce8?w=2038&cf_fit=scale
            -down&q=85&format=auto&s=220c4bb5903edfcb4337a0cdd4fadfa10789
            fef633d9dfe3a2287b170f6a76d6"
        ]);
        categoria::create([
            "name" => "graos",
            "descricao" => "graos arroz feijao soja etc",
            "icone" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEP9aefawzxcgSPMBYCisdbrLSBDFa3s3kiQ&s"
        ]);
        categoria::create([
            "name" => "carne",
            "descricao" => "carne frango peixe",
            "icone" => "https://cdn-icons-png.flaticon.com/256/1046/1046769.png"
        ]);
    }
}
