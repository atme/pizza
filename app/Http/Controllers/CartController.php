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
            'currencyRate' => config('app.currency_rate'),
            'deliveryCost' => config('app.delivery_cost'),
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
