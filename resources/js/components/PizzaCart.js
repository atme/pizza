import React from "react";

const PizzaCart = props => (
    <tr>
        <th scope="row" className="border-0">
            <div className="p-2">
                <img
                    src={props.image}
                    alt={props.name}
                    width="70"
                    className="img-fluid rounded shadow-sm"
                />
                <div className="ml-3 d-inline-block align-middle">
                    <h5 className="mb-0">{props.name}</h5>
                </div>
            </div>
        </th>
        <td className="border-0 align-middle">
            <strong>{props.price}</strong>
        </td>
        <td className="border-0 align-middle">
            <button
                onClick={props.removeFromCart}
                className="btn btn-lg btn-block btn-danger"
            >
                Remove from cart
            </button>
        </td>
    </tr>
);

export default PizzaCart;
