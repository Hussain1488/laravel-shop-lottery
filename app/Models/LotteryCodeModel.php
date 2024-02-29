<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LotteryCodeModel extends Model
{
    use HasFactory;

    protected $table = 'lottery_codes';

    protected $fillable = ['user_id', 'code', 'daily_code_id', 'invoice_id', 'weekly_stat', 'monthly_stat'];

    public function dailyCode()
    {
        return $this->belongsToMany(DailyCodeModel::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function winner()
    {
        return $this->hasMany(LotteryWinnersModel::class, 'lottery_code_id');
    }

    public function invoice()
    {
        return $this->belongsTo(InvoicesModel::class, 'invoice_id');
    }
}