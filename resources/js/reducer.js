const initialState = JSON.parse(localStorage.getItem("state")) || {
    cart: [],
    currency: "€"
};

const reducer = (state, action) => {
    switch (action.type) {
        case "addToCart":
            return { ...state, cart: [...state.cart, action.id] };
        case "removeFromCart":
            return {
                ...state,
                cart: state.cart
                    .slice(0, action.index)
                    .concat(state.cart.slice(action.index + 1))
            };
        case "cleanCart":
            return { ...state, cart: [] };
        case "switchCurrency":
            const currency = state.currency === "€" ? "$" : "€";
            return { ...state, currency };
        default:
            throw new Error();
    }
};

const saveInLocalStorage = reducer => (state, action) => {
    const newState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(newState));
    return newState;
};

const localStorageReducer = saveInLocalStorage(reducer);

export { initialState, localStorageReducer as reducer };
