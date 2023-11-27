<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Morilog\Jalali\Jalalian;

class createstoretransaction extends Model
{
    use HasFactory;

    protected $table = "createstoretransactions";
    protected $fillable = ["store_id", "flag", "datetransaction", "typeoftransaction", "price", "finalprice", "documentnumber", "bank_id", 'user_id', 'pre_paid_time'];


    public function store()
    {
        return $this->belongsTo(createstore::class, 'store_id');
    }
    public function bankTransaction()
    {
        return $this->hasOne(BankTransaction::class, 'store_trans_id');
    }


    public function storeTransaction($store, $CreditAmount, $status, $type, $flag, $user = null, $timestamp = null)
    {
        $count = createstoretransaction::count();
        if ($count > 0) {
            $number = createstoretransaction::latest()->first()->documentnumber + 1;
            if (createstoretransaction::where('flag', $flag)->where('store_id', $store->id)->exists()) {
                if ($status) {
                    $finalprice = createstoretransaction::where('flag', $flag)->where('store_id', $store->id)->latest()->first()->finalprice + $CreditAmount;
                } else {
                    $finalprice = createstoretransaction::where('flag', $flag)->where('store_id', $store->id)->latest()->first()->finalprice - $CreditAmount;
                }
            } else {
                if ($status) {

                    $finalprice = +$CreditAmount;
                } else {
                    $finalprice = -$CreditAmount;
                }
            }
        } else {
            $number = 10000;
            if ($status) {

                $finalprice = +$CreditAmount;
            } else {
                $finalprice = -$CreditAmount;
            }
        }
        $transaction = createstoretransaction::create([
            'store_id' => $store->id,
            'datetransaction' => Jalalian::now()->format('Y-m-d'),
            // 1 is for main wallet
            'flag' => $flag,
            // pay request
            'typeoftransaction' => $type,
            'price' => $CreditAmount,
            'finalprice' => $finalprice,
            'documentnumber' => $number,
            'user_id' => $user,
            'pre_paid_time' => $timestamp,
        ]);
        // dd($transaction);
        return $transaction->id;
    }
}
