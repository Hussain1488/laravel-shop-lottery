<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyCodeModel extends Model
{
    use HasFactory;

    protected $table = 'daily_code';

    protected $fillable = ['source', 'date'];

    static function latteryCode()
    {
        return $this->hasMany(LatteryCodeModel::class, 'daily_code_id')
    }
}
