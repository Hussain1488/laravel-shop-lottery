<?php

namespace App\Services\Sms;

use App\Contracts\SmsContract;
use App\Contracts\SmsNotificationContract;
use Exception;
use Melipayamak\MelipayamakApi;

class MelipayamakSms extends SmsService implements SmsContract, SmsNotificationContract
{
    public function send()
    {

        // dd(option()->all());
        $method = $this->method();
        $data   = $this->$method();

        $input_data   = $data['input_data'];
        $mobile       = $this->mobile();


        try {
            $username = option('MELIPAYAMAK_PANEL_USERNAME');
            $password = option('MELIPAYAMAK_PANEL_PASSWORD');
            $api = new MelipayamakApi($username, $password);
            $sms = $api->sms();
            $to = $mobile;
            $from = '50004001000143';
            $text = $this->type['string'] . ' :' . implode(', ', $input_data);
            $response = $sms->send($to, $from, $text);
            $json = json_decode($response);
            echo $json->Value; //RecId or Error Number
        } catch (Exception $e) {
            echo $e->getMessage();
            // dd($e->getMessage());
        }


        return;
    }

    public function verifyCode()
    {
        return [
            'bodyId'       => option('user_verify_pattern_code_melipayamak'),
            'input_data'   => [
                '0' => $this->data['code']
            ],
        ];
    }

    public function userCreated()
    {
        return [
            'bodyId'       => option('user_register_pattern_code_melipayamak'),
            'input_data'   => [
                '0'   => $this->data['fullname'],
                '1'   => $this->data['username'],
            ],
        ];
    }

    public function orderPaid()
    {
        return [
            'bodyId'       => option('order_paid_pattern_code_melipayamak'),
            'input_data'   => [
                '0' => $this->data['order_id']
            ],
        ];
    }

    public function userOrderPaid()
    {
        return [
            'bodyId'       => option('user_order_paid_pattern_code_melipayamak'),
            'input_data'   => [
                '0' => $this->data['order_id']
            ],
        ];
    }

    public function walletAmountDecreased()
    {
        return [
            'bodyId'       => option('wallet_decrease_pattern_code_melipayamak'),
            'input_data'   => [
                '0' => $this->data['amount']
            ],
        ];
    }

    public function walletAmountIncreased()
    {
        return [
            'bodyId'       => option('wallet_increase_pattern_code_melipayamak'),
            'input_data'   => [
                '0' => $this->data['amount']
            ],
        ];
    }
}
