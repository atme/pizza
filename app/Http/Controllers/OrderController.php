<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            'currencyRate' => 1.18,
            'deliveryCost' => 5,
            'orders' => Auth::user()->orders()->with(['pizzas'])->get(['id']),
        ]);
    }

    /**
     * Create an order.
     *
     * @param  Request  $request
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function store(Request $request)
    {
        if (Auth::check()) {
            Auth::user()
                ->orders()
                ->create([])
                ->pizzas()
                ->attach($request->cart);
        }
        return ['status' => 'success'];
    }
}
