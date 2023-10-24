<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CooperationSales extends Model
{
    use HasFactory;

    public function makeInstallmentsms()
    {
        return $this->belongsTo(Makeinstallmentsm::class, 'userselected');
    }
}
