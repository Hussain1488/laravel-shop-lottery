<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class paymentdetails extends Model
{
    use HasFactory;

    protected $table = 'paymentdetails';
    protected $fillable = [
        'list_of_payment_id',
        'Issuetracking',
        'nameofbank',
        'documentpayment',
    ];

    public function payments()
    {
        return $this->belongsTo(PaymentListModel::class, 'list_of_payment_id');
    }
}
