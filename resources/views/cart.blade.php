@extends('layouts.app')

@section('content')
<div
    id="cart" 
    data-pizzas="{{ base64_encode($pizzas->toJson()) }}"
    data-currency-rate="{{ $currencyRate }}"
    data-delivery-cost="{{ $deliveryCost }}"
    data-user-name="{{ base64_encode($userName) }}"
></div>
@endsection
