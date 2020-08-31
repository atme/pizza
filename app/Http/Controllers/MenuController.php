<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pizza;

class MenuController extends Controller
{
    /**
     * Show the menu.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('menu', [
            'pizzas' => Pizza::all(),
            'currencyRate' => config('app.currency_rate'),
        ]);
    }
}
