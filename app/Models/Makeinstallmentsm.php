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

    public function user()
    {
        return $this->belongsTo(User::class, 'userselected');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function store()
    {
        return $this->belongsTo(createstore::class, 'store_id');
    }

    public function installments()
    {
        return $this->hasMany(installmentdetails::class, 'installment_id');
    }
}
