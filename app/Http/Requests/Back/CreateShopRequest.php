<?php

namespace App\Http\Requests\Back;

use Illuminate\Foundation\Http\FormRequest;

class CreateShopRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'required',
            'uploaddocument' => 'required',
            'nameofstore' => 'required|string',
            'addressofstore' => 'required|string',
            'storecredit' => 'required',
            'enddate' => 'required|date',
            'feepercentage' => 'required|numeric',
            'settlementtime' => 'required|min:1|max:255',
            'account_id' => 'required',
        ];
    }
    public function attributes()
    {
        return [
            'user_id' => 'کاربر',
            'uploaddocument' => 'فایل مستندات',
            'nameofstore' => 'نام فروشگاه',
            'addressofstore' => 'آدرس فروشگاه',
            'storecredit' => 'اعتبار فروشگاه',
            'enddate' => 'تاریخ پایان قرارداد',
            'feepercentage' => 'درصد کارمزد فروشگاه',
            'settlementtime' => 'زمان تصفیه',
            'account_id' => 'حساب درآمد',
        ];
    }
}
