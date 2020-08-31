<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Pizza;

class OrderController extends Controller
{
    /**
     * Show orders.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('order', [
            'currencyRate' => env('CURRENCY_RATE', 1.18),
            'deliveryCost' => env('DELIVERY_COST', 5),
            'orders' => Auth::user()
                ->orders()
                ->with(['pizzas'])
                ->get(['id', 'address']),
        ]);
    }

    /**
     * Create an order.
     *
     * @param  Request  $request
     * @return array
     */
    public function store(Request $request)
    {
        $pizzaIds = Pizza::get(['id'])->pluck('id');
        $request->validate([
            'address' => ['required', 'string', 'min:1'],
            'cart' => ['required', 'array', 'min:1'],
            'cart.*' => ['integer', Rule::in($pizzaIds)]
        ]);

        if (Auth::check()) {
            Auth::user()
                ->orders()
                ->create(['address' => $request->address])
                ->pizzas()
                ->attach($request->cart);
        }
        // send email or something else about order
        return ['status' => 'success'];
    }
}
