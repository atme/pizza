const currencyConverter = (currency, rate) => price =>
    currency === "EUR" ? price : Math.ceil(price * rate * 100) / 100;

export default { currencyConverter };
