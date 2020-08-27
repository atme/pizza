import React from "react";

const CartButton = props => (
    <div>
        <a href="/cart">Cart: {props.count}</a>
    </div>
);

export default CartButton;
