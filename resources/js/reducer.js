const initialState = { cart: JSON.parse(localStorage.getItem("cart")) || [] };

const reducer = (state, action) => {
    switch (action.type) {
        case "add":
            const cart = [...state.cart, action.id];
            localStorage.setItem("cart", JSON.stringify(cart));
            return { cart };
        default:
            throw new Error();
    }
};

export { initialState, reducer };
