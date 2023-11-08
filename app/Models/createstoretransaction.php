<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class createstoretransaction extends Model
{
    use HasFactory;

    protected $table = "createstoretransactions";
    protected $fillable = ["store_id", "flag", "datetransaction", "typeoftransaction", "price", "finalprice", "documentnumber"];

    
}
