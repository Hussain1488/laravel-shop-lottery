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
            'selectperson' => 'required',
            'uploaddocument' => 'required',
            'nameofstore' => 'required|string',
            'addressofstore' => 'required|string',
            'storecredit' => 'required|numeric',
            'enddate' => 'required|date',
            'feepercentage' => 'required|numeric',
        ];
    }
    public function attributes()
    {
        return [
            'selectperson' => 'کاربر',
            'uploaddocument' => 'فایل مستندات',
            'nameofstore' => 'نام فروشگاه',
            'addressofstore' => 'آدرس فروشگاه',
            'storecredit' => 'اعتبار فروشگاه',
            'enddate' => 'تاریخ پایان قرارداد',
            'feepercentage' => 'درصد کارمزد فروشگاه',
        ];
    }
}
