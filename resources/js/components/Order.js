import React from "react";
import ReactDOM from "react-dom";
import Pizza from "./Pizza";
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
        <>
            <Currency
                currency={state.currency}
                switchCurrency={() => dispatch({ type: "switchCurrency" })}
            />
            {orders.map(order => (
                <Order
                    order={order}
                    deliveryCost={deliveryCost}
                    key={order.id}
                />
            ))}
        </>
    );
};

export default OrderList;

const Order = props => {
    const totalPrice = (
        props.order.pizzas.reduce(
            (totalPrice, { price }) => totalPrice + price,
            0
        ) + props.deliveryCost
    ).toFixed(2);
    return (
        <>
            {props.order.pizzas.map(
                ({ price, name, description, image, id }) => (
                    <Pizza
                        name={name}
                        key={id}
                        price={price}
                        description={description}
                        image={image}
                        addToCart={() =>
                            dispatch({ type: "removeFromCart", id })
                        }
                    />
                )
            )}
            <div>Delivery cost: {props.deliveryCost}</div>
            <div>Total price: {totalPrice}</div>
        </>
    );
};

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
