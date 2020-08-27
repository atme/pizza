@extends('layouts.app')

@section('content')
<div
    id="cart" 
    data-pizzas="{{ base64_encode(json_encode($pizzas)) }}"
    data-currency-rate="{{ $currencyRate }}"
    data-delivery-cost="{{ $deliveryCost }}"
></div>
@endsection
