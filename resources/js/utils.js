const currencyConverter = (currency, rate) => price =>
    currency === "€" ? price : Math.ceil(price * rate * 100) / 100;

export default { currencyConverter };
