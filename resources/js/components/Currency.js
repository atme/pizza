import React from "react";

const Currency = ({ currency, switchCurrency }) => (
    <div>
        Currency:
        <button onClick={switchCurrency}>{currency}</button>
    </div>
);

export default Currency;
