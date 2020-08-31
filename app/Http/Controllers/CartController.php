<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pizza;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Show the cart.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $data = [
            'pizzas' => Pizza::all(),
            'currencyRate' => env('CURRENCY_RATE', 1.18),
            'deliveryCost' => env('DELIVERY_COST', 5),
            'userName' => '',
            'userAddress' => '',
        ];
        if (Auth::check()) {
            $data['userName'] = Auth::user()->name;
            if (Auth::user()->orders()->count() > 0) {
                $data['userAddress'] = Auth::user()
                    ->orders()
                    ->latest('created_at')
                    ->first()->address;
            }
        }
        return view('cart', $data);
    }
}
