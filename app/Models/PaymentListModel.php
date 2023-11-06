<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentListModel extends Model
{
    use HasFactory;

    protected $table = 'list_of_payment';
    protected $fillable = ['store_id', 'list_id', 'depositamount', 'shabanumber', 'factor', 'depositdate', 'status'];
}
