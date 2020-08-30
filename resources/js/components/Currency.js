import React from "react";

const Currency = ({ currency, switchCurrency }) => (
    <div class="custom-control custom-switch">
        <input
            type="checkbox"
            class="custom-control-input"
            id="currency"
            onClick={switchCurrency}
            checked={currency === "$"}
        />
        <label class="custom-control-label" for="currency">
            USD
        </label>
    </div>
);

export default Currency;
