import React from "react";

const Pizza = props => (
    <div>
        <div>{props.name}</div>
        <div>{props.price}</div>
        <div>{props.description}</div>
        <div>{props.image}</div>
    </div>
);

export default Pizza;
