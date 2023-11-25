<?php

namespace App\Console\Commands;

use App\Models\CornjobModel;
use App\Models\createstore;
use Illuminate\Support\Facades\Log;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Session;

class StoreCreditReset extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:storeCreditReset';


    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Session::put('storeCredit', true);

        $stores = createstore::all();
        foreach ($stores as $key) {
            $key->storecredit = $key->conrn_job_reccredite;
            $key->save();
        }

        CornjobModel::create([
            'name' => 'اعتبار فروشگاه',
            'description' => 'اعتبار دوره ای فروشگاه ها با موفقیت انجام شد',
        ]);
        log::info('Cron job executed successfully at ' . now());
        // Session::push('storeCredit', true);
        return 0;
    }
}
