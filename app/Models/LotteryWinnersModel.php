<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LotteryWinnersModel extends Model
{
    use HasFactory;

    protected $table = 'lottery_winners';
    protected $fillable = ['user_id', 'lottery_code_id', 'type', 'start_date', 'end_date', 'lottery_date'];
}
