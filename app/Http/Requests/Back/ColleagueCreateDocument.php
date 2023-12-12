<?php

namespace App\Http\Requests\Back;

use Illuminate\Foundation\Http\FormRequest;

class ColleagueCreateDocument extends FormRequest
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
            "namedebtor" => "required",
            "namecreditor" => "required",
            "ReCredintAmount" => "required",
            "documents" => "required",
            "description" => "required|max:700",
        ];
    }
    public function attributes()
    {

        return [
            "namedebtor" => "اسم بدهکار",
            "namecreditor" => "اسم بستانکار",
            "ReCredintAmount" => "مقدار اعتبار",
            "documents" => "اسناد",
            "description" => "توضیحات",
        ];
    }
}
