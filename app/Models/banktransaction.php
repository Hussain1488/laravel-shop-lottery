<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Morilog\Jalali\Jalalian;

class banktransaction extends Model
{
    use HasFactory;

    protected $table = "banktransactions";

    protected $fillable = ['bank_id', 'bankbalance', 'transactionprice', 'transactionsdate', 'buyer_trans_id', 'store_trans_id'];

    public function bank()
    {
        return $this->belongsTo(BankAccount::class, 'bank_id');
    }

    public function storeTransaction()
    {
        return $this->belongsTo(createstoretransaction::class, 'store_trans_id');
    }

    public function buyerTransaction()
    {
        return $this->belongsTo(buyertransaction::class, 'buyer_trans_id');
    }

    public function transaction($bank_id, $creditAmount, $status, $trans_id)
    {

        $recordCount = banktransaction::where('bank_id', $bank_id)->count();
        if ($recordCount > 0) {
            $lastRecord = banktransaction::where('bank_id', $bank_id)->latest()->first();
            $bank = banktransaction::create([
                'bank_id' => $bank_id,
                'bankbalance' => $status ? $lastRecord->bankbalance + $creditAmount : $lastRecord->bankbalance - $creditAmount,
                'transactionprice' => $creditAmount,
                'transactionsdate' => Jalalian::now()->format('Y-m-d'),
                'buyer_trans_id' => $trans_id

            ]);
        } else {
            $bank = banktransaction::create([
                'bank_id' => $bank_id,
                'bankbalance' => $status ? $creditAmount : -$creditAmount,
                'transactionprice' => $creditAmount,
                'transactionsdate' => Jalalian::now()->format('Y-m-d'),
                'buyer_trans_id' => $trans_id
            ]);
        }
        return $bank;
    }
}
