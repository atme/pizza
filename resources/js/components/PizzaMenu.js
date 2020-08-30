import React from "react";

const PizzaMenu = props => (
    <div className="card h-100">
        <img src={props.image} className="card-img-top" alt={props.name} />
        <div className="card-body">
            <h5 className="card-title">
                {props.name}{" "}
                <span className="badge badge-secondary">{props.price}</span>
            </h5>
            <p className="card-text">{props.description}</p>
        </div>

        <div className="card-footer">
            <button
                onClick={props.addToCart}
                className="btn btn-lg btn-block btn-primary"
            >
                Add to cart
            </button>
        </div>
    </div>
);

export default PizzaMenu;
