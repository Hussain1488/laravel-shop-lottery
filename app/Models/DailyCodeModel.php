<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyCodeModel extends Model
{
    use HasFactory;

    protected $table = 'daily_code';

    protected $fillable = ['source', 'date'];

    public function lotteryCode()
    {
        return $this->belongsToMany(LotteryCodeModel::class, 'daily_code_id');
    }
}
