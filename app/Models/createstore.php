<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class createstore extends Model
{
    use HasFactory;
    protected $table = 'createstores';
    protected $guarded = [];


    //  defining relation with user model
    public function user()
    {
        return $this->belongsTo(User::class, 'selectperson');
    }
}
