<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\OneTimeCode;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;

class LoginWithCodeController extends Controller
{
    public function create(Request $request)
    {
        $view = config('front.pages.login-with-code');

        // if (!$view || option('login_with_code', 'off') == 'off') {
        //     abort(404);
        // }

        return view($view);
    }

    public function store(Request $request)
    {
        if (Session::get('captcha')) {
            $request->validate([
                'captcha' => ['required', 'captcha'],
            ], [
                'mobile.exists' => 'حساب کاربری با شماره موبایل ' . $request->mobile . ' وجود ندارد. لطفا ثبت نام کنید'
            ]);
        }
        Session::put('captcha', true);


        $type = new class
        {
            public $code;
            public $text;
        };
        $user = User::where('username', $request->mobile)->first();

        if ($user) {
            PasswordResetLinkController::sendCode($user);

            return response()->json(['status' => 'success', 'data' => 'login']);
        } else {
            // Create a new user
            $user = new User();
            $user->username = $request->mobile;

            $type = new \stdClass(); // Creating a new instance of stdClass
            $type->code = rand(11111, 99999);
            $type->text = 'کد تأیید خانه اقساط:';

            // Assuming verifySms is a function that expects $type and $user as arguments
            verifySms($type, $user);
            Session::put('newUser', ['number' => $request->mobile, 'code' => $type->code]);
            return response()->json(['status' => 'success', 'data' => 'true']);
        }
    }

    public function confirm(Request $request)
    {
        $request->validate([
            'mobile' => 'required|exists:users,username',
        ]);

        $user = User::where('username', $request->mobile)->first();
        $time = Carbon::now()->subMinutes(15);
        $request->validate([
            'verify_code'     => [
                'required',
                Rule::exists('one_time_codes', 'code')->where(function ($query) use ($user, $time) {
                    $query->where('user_id', $user->id)->where('created_at', '>=', $time);
                }),
            ]
        ], [
            'verify_code.exists' => 'کد وارد شده اشتباه است'
        ]);

        OneTimeCode::where('user_id', $user->id)->delete();

        return response('success');
    }
}
