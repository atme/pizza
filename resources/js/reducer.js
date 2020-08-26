const initialState = JSON.parse(localStorage.getItem("state")) || {
    cart: [],
    currency: "EUR"
};

const reducer = (state, action) => {
    switch (action.type) {
        case "addToCart":
            const cart = [...state.cart, action.id];
            return Object.assign({}, state, { cart });
        case "switchCurrency":
            const currency = state.currency === "EUR" ? "USD" : "EUR";
            return Object.assign({}, state, { currency });
        default:
            throw new Error();
    }
};

const saveInLocalStorage = reducer => (state, action) => {
    const newState = reducer(state,action);
    localStorage.setItem("state", JSON.stringify(newState));
    return newState;
}

const localStorageReducer = saveInLocalStorage(reducer);

export { initialState, localStorageReducer as reducer };
