<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Morilog\Jalali\Jalalian;

class createstoretransaction extends Model
{
    use HasFactory;

    protected $table = "createstoretransactions";
    protected $fillable = ["store_id", "flag", "datetransaction", "typeoftransaction", "price", "finalprice", "documentnumber", "bank_id"];



    public function storeTransaction($store, $CreditAmount, $status, $type, $flag)
    {
        $count = createstoretransaction::count();
        if ($count > 0) {
            $number = createstoretransaction::latest()->first()->documentnumber + 1;
            if (createstoretransaction::exists()) {
                if ($status) {
                    $finalprice = createstoretransaction::latest()->first()->finalprice + $CreditAmount;
                } else {
                    $finalprice = createstoretransaction::latest()->first()->finalprice - $CreditAmount;
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
        ]);
        // dd($transaction);
        return $transaction->id;
    }
}
