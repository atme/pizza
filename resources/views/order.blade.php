@extends('layouts.app')

@section('content')
<div
    id="order" 
    data-currency-rate="{{ $currencyRate }}"
    data-delivery-cost="{{ $deliveryCost }}"
    data-orders="{{ base64_encode($orders->toJson()) }}"
></div>
@endsection
