<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class createdocument extends Model
{
    use HasFactory;
    protected $table = 'createdocuments';

    protected $fillable = ['namedebtor', 'namecreditor', 'price', 'documents', 'numberofdocuments', 'description'];
}
