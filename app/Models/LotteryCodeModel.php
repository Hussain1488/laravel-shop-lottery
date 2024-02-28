<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LotteryCodeModel extends Model
{
    use HasFactory;

    protected $table = 'lottery_codes';

    protected $fillable = ['user_id', 'code', 'daily_code_id', 'invoice_id', 'weekly_stat', 'monthly_stat'];
}
