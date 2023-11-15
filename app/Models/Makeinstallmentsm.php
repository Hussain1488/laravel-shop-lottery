<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Makeinstallmentsm extends Model
{
    use HasFactory;
    protected $table = 'makeinstallmentsms';
    protected $guarded = [];

    // defining relation with user model as user
    public function user()
    {
        return $this->belongsTo(User::class, 'userselected');
    }

    // defining relation with user model as seller

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    // defining relation with createstore model

    public function store()
    {
        return $this->belongsTo(createstore::class, 'store_id');
    }

    // defining relation with installmentsdetails model

    public function installments()
    {
        return $this->hasMany(installmentdetails::class, 'installment_id');
    }

    public function refuse($id)
    {
        $refuse = Makeinstallmentsm::find($id);
        $store = createstore::find($refuse->store_id);
        $user = User::find($refuse->userselected);
        $store->storecredit += $refuse->Creditamount;
        $user->purchasecredit += $refuse->Creditamount;
        // dd($refuse->Creditamount, $user->purchasecredit);
        $store_trans = createstoretransaction::storeTransaction($store, $refuse->Creditamount, true, 0, 0);


        $user->save();
        $store->save();
        $refuse->delete();

        return true;
    }
}
