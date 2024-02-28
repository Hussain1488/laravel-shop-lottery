<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyCodeModel extends Model
{
    use HasFactory;

    protected $table = 'daily_code';

    protected $fillable = ['source', 'date'];

    static function lotteryCode()
    {
        return $this->hasMany(LotteryCodeModel::class, 'daily_code_id')
    }
}
