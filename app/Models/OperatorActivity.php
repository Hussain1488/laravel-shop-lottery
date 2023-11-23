<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperatorActivity extends Model
{
    protected $table = "operator_activities";
    protected $fillable = [];
    use HasFactory;
    public function store()
    {
        return $this->belongsTo(users::class, 'user_id'); 
    }
}
