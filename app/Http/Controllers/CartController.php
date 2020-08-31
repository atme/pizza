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
            $last_order = Auth::user()->last_order;
            if ($last_order) {
                $data['userAddress'] = $last_order->address;
            }
        }
        return view('cart', $data);
    }
}
