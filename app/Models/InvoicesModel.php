<?php

namespace App\Models;

use App\Http\Controllers\lotteryController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoicesModel extends Model
{
    use HasFactory;

    protected $table = 'invoices';
    protected $fillable = '';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function lotteryCode()
    {
        return $this->hasMany(LotteryCodeModel::class, 'invoice_id');
    }
}
