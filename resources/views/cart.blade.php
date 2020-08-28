@extends('layouts.app')

@section('content')
<div
    id="cart" 
    data-pizzas="{{ base64_encode($pizzas->toJson()) }}"
    data-currency-rate="{{ $currencyRate }}"
    data-delivery-cost="{{ $deliveryCost }}"
></div>
@endsection