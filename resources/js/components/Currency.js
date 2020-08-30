import React from "react";

const Currency = ({ currency, switchCurrency }) => (
    <div className="custom-control custom-switch">
        <input
            type="checkbox"
            className="custom-control-input"
            id="currency"
            onClick={switchCurrency}
            defaultChecked={currency === "$"}
        />
        <label className="custom-control-label" htmlFor="currency">
            USD
        </label>
    </div>
);

export default Currency;
