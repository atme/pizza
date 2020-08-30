import React from "react";
import ReactDOM from "react-dom";
import PizzaMenu from "./PizzaMenu";
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
            <div className="container">
                <nav className="navbar navbar-light bg-light">
                    <Currency
                        currency={state.currency}
                        switchCurrency={() =>
                            dispatch({ type: "switchCurrency" })
                        }
                    />
                    <CartButton count={state.cart.length} />
                </nav>
                <div className="row row-cols-1 row-cols-md-4">
                    {props.pizzas.map(
                        ({ id, price, name, description, image }) => (
                            <div className="col mb-4">
                                <PizzaMenu
                                    name={name}
                                    key={id}
                                    price={
                                        convertCurrency(price).toString() +
                                        state.currency
                                    }
                                    description={description}
                                    image={image}
                                    addToCart={() =>
                                        dispatch({ type: "addToCart", id })
                                    }
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
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
