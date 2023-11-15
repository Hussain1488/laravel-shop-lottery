<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Morilog\Jalali\Jalalian;

class buyertransaction extends Model
{
    use HasFactory;

    protected $table = 'buyertransactions';

    protected $guarded = [];

    public function user()
    {
        return  $this->belongsTo(User::class);
    }

    public function transaction($user, $amount, $status)
    {
        $user_transaction_number = buyertransaction::count();
        if ($user_transaction_number > 0) {
            $doc_number = buyertransaction::latest()->first()->documentnumber + 1;
            if (buyertransaction::where('flag', 1)->where('user_id', $user->id)->count() > 0) {
                if ($status) {
                    $final_price = buyertransaction::where('flag', 1)->where('user_id', $user->id)->latest()->first()->finalprice + $amount;
                } else {
                    $final_price = buyertransaction::where('flag', 1)->where('user_id', $user->id)->latest()->first()->finalprice - $amount;
                }
            } else {
                if ($status) {

                    $final_price = +$amount;
                } else {

                    $final_price = -$amount;
                }
            }
        } else {
            $doc_number = 10000;
            if ($status) {

                $final_price = +$amount;
            } else {

                $final_price = -$amount;
            }
        }

        $user_trans = buyertransaction::create([
            'user_id' => $user->id,
            'flag' => 1,
            'datetransaction' => Jalalian::now(),
            'typeoftransaction' => 0,
            'price' => $amount,
            'finalprice' => $final_price,
            'documentnumber' => $doc_number
        ]);
        return $user_trans;
    }
}
