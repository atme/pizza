import React from "react";
import ReactDOM from "react-dom";
import Pizza from "./Pizza";
import CartButton from "./CartButton";
import { reducer, initialState } from "./../reducer";
import Currency from "./Currency";
import Utils from "./../utils";

const Menu = props => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const convertCurrency = Utils.currencyConverter(
        state.currency,
        props.currencyRate
    );
    return (
        <>
            <CartButton count={state.cart.length} />
            <Currency
                currency={state.currency}
                switchCurrency={() => dispatch({ type: "switchCurrency" })}
            />
            {props.pizzas.map(({ id, price, name, description, image }) => (
                <Pizza
                    name={name}
                    key={id}
                    price={convertCurrency(price)}
                    description={description}
                    image={image}
                    addToCart={() => dispatch({ type: "addToCart", id })}
                />
            ))}
        </>
    );
};

export default Menu;

if (document.getElementById("menu")) {
    const menu = document.getElementById("menu");
    const { pizzas, currencyRate } = menu.dataset;
    ReactDOM.render(
        <Menu
            pizzas={JSON.parse(atob(pizzas))}
            currencyRate={parseFloat(currencyRate)}
        />,
        menu
    );
}
