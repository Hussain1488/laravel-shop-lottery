<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperatorActivity extends Model
{
    protected $table = "operator_activities";
    protected $fillable = [];
    use HasFactory;
    public function operator()
    {
        return $this->belongsTo(User::class, 'operator_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
