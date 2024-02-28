<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LatteryWinnersModel extends Model
{
    use HasFactory;

    protected $table = 'lattery_winners';
    protected $fillable = ['user_id', 'lattery_code_id', 'type', 'start_date', 'end_date', 'lattery_date'];
}
