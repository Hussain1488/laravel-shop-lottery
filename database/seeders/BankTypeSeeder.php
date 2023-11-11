<?php

namespace Database\Seeders;

use App\Models\bankTypeModel;
use Illuminate\Database\Seeder;

class BankTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = ['بانک', 'درآمد', 'هزینه', 'واسط قسط ها', 'واسط اعتبار فروش فروشگاه ها'];
        foreach ($names as $name) {
            bankTypeModel::create([
                "name" => $name
            ]);
        }
    }
}
