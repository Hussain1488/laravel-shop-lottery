<?php

namespace App\Console\Commands;

use App\Models\CornjobModel;
use App\Models\installmentdetails;
use Carbon\Carbon;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Melipayamak\MelipayamakApi;

class BeforInstallmentMessageCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:BeforInstallmentMessageCommand';

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
        $installments = installmentdetails::whereDate('duedate', '=', Carbon::now()->addDays(option('message_send_befor_day')))->with('installments.user')->get();
        $counter = 0;
        if ($installments) {
            foreach ($installments as $key) {
                $counter++;
                $text = (option('installment_befor_message') ?? 'اطلاع رسانی جهت پرداخت قسط!') . "\r\n" .
                    'قسط شماره ' . $key->installmentnumber . ' شما در تاریخ ( ' . jdate($key->duedate)->format('d-M-Y') .
                    ' )   سر رسید میشود، لطفاً جهت پرداخت قسط اقدام نمایید.';
                $smsMessage = $text . "\r\n" . 'ممنون که از ما خرید کردید!' . "\r\n" . url()->to('/');
                $this->sendSms($key->installments->user, $smsMessage);
            }
            CornjobModel::create([
                'name' => 'اطلاع رسانی پرداخت قسط',
                'description' => 'برای ' . $counter . ' کاربر جهت پرداخت قسط قبل از سر رسید پیامک ارسال شد!'
            ]);
        }
        Log::info('Cron job installment befor message executed successfully at ' . now());
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
            Log::error($e);
            // dd($e->getMessage());
        }
        return;
    }
}
