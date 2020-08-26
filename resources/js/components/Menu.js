import React from "react";
import ReactDOM from "react-dom";
import Pizza from "./Pizza";
import CartButton from "./CartButton";
import { reducer, initialState } from "./../reducer";
import Currency from "./Currency";

const Menu = props => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
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
                    price={
                        state.currency === "EUR"
                            ? price
                            : Math.ceil(price * props.currencyRate * 100) / 100
                    }
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
