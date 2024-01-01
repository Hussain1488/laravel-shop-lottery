<?php

namespace App\Console\Commands;

use App\Models\CornjobModel;
use App\Models\installmentdetails;
use Carbon\Carbon;
use Exception;
use Illuminate\Console\Command;
use Melipayamak\MelipayamakApi;

class AfterInstallmentMessageCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:name';

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
        return 0;
    }

    public function sendSms($user, $message)
    {
        try {
            $username = option('MELIPAYAMAK_PANEL_USERNAME');
            $password = option('MELIPAYAMAK_PANEL_PASSWORD');
            $api = new MelipayamakApi($username, $password);
            $sms = $api->sms();
            $to = $user->username;
            $from = option('admin_mobile_number');
            $text = $message;
            $response = $sms->send($to, $from, $text);
            $json = json_decode($response);
            // echo $json->Value; //RecId or Error Number
        } catch (Exception $e) {
            // echo $e->getMessage();
            // dd($e->getMessage());
        }
        return;
    }
}
