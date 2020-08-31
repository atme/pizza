import React from "react";
import ReactDOM from "react-dom";
import PizzaCart from "./PizzaCart";
import { reducer, initialState } from "./../reducer";
import Currency from "./Currency";
import Utils from "./../utils";
import Axios from "axios";

const Cart = props => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [name, setName] = React.useState(props.userName);
    const [address, setAddress] = React.useState(props.userAddress);
    const [ordered, setOrdered] = React.useState(false);
    const convertCurrency = Utils.currencyConverter(
        state.currency,
        props.currencyRate
    );
    const cart = state.cart
        .map(id => props.pizzas.find(pizza => pizza.id === id))
        .map(pizza =>
            Object.assign({}, pizza, { price: convertCurrency(pizza.price) })
        );
    const subtotalPrice =
        cart.reduce((totalPrice, { price }) => totalPrice + price * 100, 0) /
        100;
    const deliveryCost = convertCurrency(props.deliveryCost);
    const totalPrice = subtotalPrice + deliveryCost;

    const handleSubmit = e => {
        e.preventDefault();
        setOrdered(true);
        dispatch({ type: "cleanCart" });
        Axios.post("/order", { cart: state.cart, name, address });
    };

    if (ordered) {
        return (
            <div className="container">
                <h1>Order is completed. Wait for delivery :)</h1>
            </div>
        );
    }

    if (state.cart.length === 0) {
        return (
            <div className="container">
                <h1>Cart is empty</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <nav className="navbar navbar-light bg-light">
                <Currency
                    currency={state.currency}
                    switchCurrency={() => dispatch({ type: "switchCurrency" })}
                />
            </nav>
            <CartTable>
                {cart.map(({ price, name, description, image }, index) => (
                    <PizzaCart
                        name={name}
                        key={index}
                        price={price + state.currency}
                        description={description}
                        image={image}
                        removeFromCart={() =>
                            dispatch({
                                type: "removeFromCart",
                                index
                            })
                        }
                    />
                ))}
            </CartTable>
            <form
                className="row py-5 p-4 bg-white rounded shadow-sm"
                onSubmit={handleSubmit}
            >
                <div className="col-lg-6">
                    <div className="bg-light px-4 py-3 text-uppercase font-weight-bold">
                        Instructions for seller
                    </div>
                    <div className="p-4">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={({ target }) => setName(target.value)}
                                disabled={props.userName.length > 0}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea
                                className="form-control"
                                id="address"
                                rows="2"
                                onChange={({ target }) =>
                                    setAddress(target.value)
                                }
                                required
                                value={address}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="bg-light px-4 py-3 text-uppercase font-weight-bold">
                        Order summary
                    </div>
                    <div className="p-4">
                        <ul className="list-unstyled mb-4">
                            <li className="d-flex justify-content-between py-3 border-bottom">
                                <strong className="text-muted">
                                    Order Subtotal
                                </strong>
                                <strong>
                                    {subtotalPrice + state.currency}
                                </strong>
                            </li>
                            <li className="d-flex justify-content-between py-3 border-bottom">
                                <strong className="text-muted">
                                    Delivery cost:
                                </strong>
                                <strong>{deliveryCost + state.currency}</strong>
                            </li>
                            <li className="d-flex justify-content-between py-3 border-bottom">
                                <strong className="text-muted">Total</strong>
                                <h5 className="font-weight-bold">
                                    {totalPrice.toFixed(2) + state.currency}
                                </h5>
                            </li>
                        </ul>
                        <button className="btn btn-lg btn-block btn-primary">
                            Order
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

const CartTable = props => (
    <div className="row">
        <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="border-0 bg-light">
                                <div className="p-2 px-3 text-uppercase">
                                    Pizza
                                </div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                                <div className="py-2 text-uppercase">Price</div>
                            </th>
                            <th scope="col" className="border-0 bg-light"></th>
                        </tr>
                    </thead>
                    <tbody>{props.children}</tbody>
                </table>
            </div>
        </div>
    </div>
);

export default Cart;

if (document.getElementById("cart")) {
    const cart = document.getElementById("cart");
    const {
        pizzas,
        currencyRate,
        deliveryCost,
        userName,
        userAddress
    } = cart.dataset;
    ReactDOM.render(
        <Cart
            pizzas={JSON.parse(atob(pizzas))}
            currencyRate={parseFloat(currencyRate)}
            deliveryCost={parseFloat(deliveryCost)}
            userName={atob(userName)}
            userAddress={atob(userAddress)}
        />,
        cart
    );
}
