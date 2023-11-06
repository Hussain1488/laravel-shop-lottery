<?php

namespace App\Http\Requests\Back;

use Illuminate\Foundation\Http\FormRequest;

class internalBankStoreRequest extends FormRequest
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
            "bankname" => "required|string",
            "accountnumber" => "required|numeric",
            "accounttype" => "required|in:expense,income,bank",
        ];
    }

    public function attributes()
    {
        return [
            "bankname" => "اسم بانک",
            "accountnumber" => "شماره حساب",
            "accounttype" => "نوع حساب",
        ];
    }
}
