import React from "react";
import ReactDOM from "react-dom";
import Pizza from "./Pizza";
import CartButton from "./CartButton";
import { reducer, initialState } from "./../reducer";

const Menu = props => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <>
            <CartButton count={state.cart.length} />
            {props.pizzas.map(({ id, price, name, description, image }) => (
                <Pizza
                    name={name}
                    key={id}
                    price={price}
                    description={description}
                    image={image}
                    addToCart={() => dispatch({ type: "add", id })}
                />
            ))}
        </>
    );
};

export default Menu;

if (document.getElementById("menu")) {
    const menu = document.getElementById("menu");
    const { pizzas } = menu.dataset;
    ReactDOM.render(<Menu pizzas={JSON.parse(atob(pizzas))} />, menu);
}
