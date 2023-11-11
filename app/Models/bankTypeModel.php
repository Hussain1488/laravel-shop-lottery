<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bankTypeModel extends Model
{
    use HasFactory;

    protected $table = 'type_of_account';
    protected $fillable = ['Name'];
}
