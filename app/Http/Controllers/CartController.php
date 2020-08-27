<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pizza;

class CartController extends Controller
{
    /**
     * Show the cart.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('cart', [
            'pizzas' => Pizza::all(),
            'currencyRate' => 1.18,
            'deliveryCost' => 5,
        ]);
    }
}
