import React from "react";

const Pizza = props => (
    <div>
        <div>{props.name}</div>
        <div>{props.price}</div>
        <div>{props.description}</div>
        <div>{props.image}</div>
        <div>
            <button onClick={props.addToCart}>Add to cart</button>
        </div>
    </div>
);

export default Pizza;
