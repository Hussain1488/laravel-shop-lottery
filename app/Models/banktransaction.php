<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class banktransaction extends Model
{
    use HasFactory;

    protected $table = "banktransactions";

    protected $fillable = ['namebank', 'bankbalance', 'transactionprice', 'transactionsdate'];

    
}
