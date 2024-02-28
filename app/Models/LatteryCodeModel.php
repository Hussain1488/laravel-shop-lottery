<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LatteryCodeModel extends Model
{
    use HasFactory;

    protected $table = 'lattery_codes';

    protected $fillable = ['user_id', 'code', 'daily_code_id', 'invoice_id', 'weekly_stat', 'monthly_stat'];
}
