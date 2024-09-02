<?php

namespace Database\Seeders;

use App\Models\Produto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 
use Faker\Factory as Faker;

class ProdutoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            DB::table('produtos')->insert([
                'name' => $faker->word,
                'descricao' => $faker->sentence,
                'quantidade' => $faker->numberBetween(1, 100),
                'preco' => $faker->randomFloat(2, 1, 100),
                'imageurl' => $faker->imageUrl,
                'categoria_id' => $faker->numberBetween(1, 10), // Altere para 'categoria_id'
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
