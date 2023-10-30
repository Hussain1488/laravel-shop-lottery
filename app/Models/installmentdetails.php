<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class installmentdetails extends Model
{
    use HasFactory;

    protected $table = 'installmentdetails';
    protected $guarded = [];
    public function installments()
    {
        return $this->belongsTo(Makeinstallmentsm::class, 'installment_id');
    }
}
