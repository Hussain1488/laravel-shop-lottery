<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class banktransaction extends Model
{
    use HasFactory;

    protected $table = "banktransactions";

    protected $fillable = ['bank_id', 'bankbalance', 'transactionprice', 'transactionsdate', 'pay_request_list_id'];

    public function bank()
    {
        return $this->belongsTo(BankAccount::class, 'bank_id');
    }
}
