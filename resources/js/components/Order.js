import React from "react";
import ReactDOM from "react-dom";
import PizzaOrder from "./PizzaOrder";
import { reducer, initialState } from "./../reducer";
import Currency from "./Currency";
import Utils from "./../utils";

const OrderList = props => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const convertCurrency = Utils.currencyConverter(
        state.currency,
        props.currencyRate
    );
    const orders = props.orders.map(order =>
        Object.assign({}, order, {
            pizzas: order.pizzas.map(pizza =>
                Object.assign({}, pizza, {
                    price: convertCurrency(pizza.price)
                })
            )
        })
    );
    const deliveryCost = convertCurrency(props.deliveryCost);

    return (
        <div className="container">
            <nav className="navbar navbar-light bg-light">
                <Currency
                    currency={state.currency}
                    switchCurrency={() => dispatch({ type: "switchCurrency" })}
                />
            </nav>
            {orders.map(order => (
                <Order
                    order={order}
                    deliveryCost={deliveryCost}
                    key={order.id}
                    currency={state.currency}
                />
            ))}
        </div>
    );
};

export default OrderList;

const Order = props => {
    const subtotalPrice =
        props.order.pizzas.reduce(
            (totalPrice, { price }) => totalPrice + price * 100,
            0
        ) / 100;
    const totalPrice = subtotalPrice + props.deliveryCost;

    return (
        <div className="row py-5 p-4 bg-white rounded shadow-sm mb-5">
            <OrderTable>
                {props.order.pizzas.map(
                    ({ price, name, description, image }, index) => (
                        <PizzaOrder
                            name={name}
                            key={index}
                            price={price + props.currency}
                            description={description}
                            image={image}
                            removeFromCart={() =>
                                dispatch({
                                    type: "removeFromCart",
                                    index
                                })
                            }
                        />
                    )
                )}
            </OrderTable>
            <div className="col-lg-6">
                <div className="bg-light px-4 py-3 text-uppercase font-weight-bold">
                    Order summary
                </div>
                <div className="p-4">
                    <ul className="list-unstyled mb-4">
                        <li className="d-flex justify-content-between py-3 border-bottom">
                            <strong className="text-muted">Address</strong>
                            <strong>{props.order.address}</strong>
                        </li>
                        <li className="d-flex justify-content-between py-3 border-bottom">
                            <strong className="text-muted">
                                Order Subtotal
                            </strong>
                            <strong>{subtotalPrice + props.currency}</strong>
                        </li>
                        <li className="d-flex justify-content-between py-3 border-bottom">
                            <strong className="text-muted">
                                Delivery cost:
                            </strong>
                            <strong>
                                {props.deliveryCost + props.currency}
                            </strong>
                        </li>
                        <li className="d-flex justify-content-between py-3 border-bottom">
                            <strong className="text-muted">Total</strong>
                            <h5 className="font-weight-bold">
                                {totalPrice.toFixed(2) + props.currency}
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const OrderTable = props => (
    <div className="table-responsive col-lg-6">
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" className="border-0 bg-light">
                        <div className="p-2 px-3 text-uppercase">Pizza</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Price</div>
                    </th>
                </tr>
            </thead>
            <tbody>{props.children}</tbody>
        </table>
    </div>
);

if (document.getElementById("order")) {
    const order = document.getElementById("order");
    const { orders, currencyRate, deliveryCost } = order.dataset;
    ReactDOM.render(
        <OrderList
            orders={JSON.parse(atob(orders))}
            currencyRate={parseFloat(currencyRate)}
            deliveryCost={parseFloat(deliveryCost)}
        />,
        order
    );
}
