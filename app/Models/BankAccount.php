<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;

    protected $table = "createbankaccounts";
    protected $fillable = ['bankname', 'accountnumber', 'accounttype'];
}
