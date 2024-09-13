<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'descricao',
        'quantidade',
        'preco',
        'imageurl',
        'categoria_id',
        'modificado_no_mes',
    ];

    protected $casts = [
        'preco' => 'decimal:2',
    ];
}
