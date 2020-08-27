import React from "react";
import ReactDOM from "react-dom";
import Pizza from "./Pizza";
import { reducer, initialState } from "./../reducer";
import Currency from "./Currency";
import Utils from "./../utils";

const Cart = props => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const convertCurrency = Utils.currencyConverter(
        state.currency,
        props.currencyRate
    );
    const cart = state.cart
        .map(id => props.pizzas.find(pizza => pizza.id === id))
        .map(pizza =>
            Object.assign({}, pizza, { price: convertCurrency(pizza.price) })
        );
    const deliveryCost = convertCurrency(props.deliveryCost);
    const totalPrice = (
        cart.reduce((totalPrice, { price }) => totalPrice + price, 0) +
        deliveryCost
    ).toFixed(2);
    return (
        <>
            <Currency
                currency={state.currency}
                switchCurrency={() => dispatch({ type: "switchCurrency" })}
            />
            {cart.map(({ price, name, description, image }, index) => (
                <Pizza
                    name={name}
                    key={index}
                    price={price}
                    description={description}
                    image={image}
                    addToCart={() =>
                        dispatch({ type: "removeFromCart", index })
                    }
                />
            ))}
            <div>Delivery cost: {deliveryCost}</div>
            <div>Total price: {totalPrice}</div>
        </>
    );
};

export default Cart;

if (document.getElementById("cart")) {
    const cart = document.getElementById("cart");
    const { pizzas, currencyRate, deliveryCost } = cart.dataset;
    ReactDOM.render(
        <Cart
            pizzas={JSON.parse(atob(pizzas))}
            currencyRate={parseFloat(currencyRate)}
            deliveryCost={parseFloat(deliveryCost)}
        />,
        cart
    );
}
