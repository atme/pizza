@extends('layouts.app')

@section('content')
<div class="content">
    <div
        id="menu"
        data-pizzas="{{ base64_encode($pizzas->toJson()) }}"
        data-currency-rate="{{ $currencyRate }}"
    ></div>
</div>
@endsection
