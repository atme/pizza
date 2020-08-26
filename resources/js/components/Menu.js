import React from "react";
import ReactDOM from "react-dom";
import Pizza from "./Pizza";
import Axios from "axios";

const Menu = props => {
    return props.pizzas.map(({ id, price, name, description, image }) => (
        <Pizza
            name={name}
            key={id}
            price={price}
            description={description}
            image={image}
        />
    ));
};

export default Menu;

if (document.getElementById("menu")) {
    Axios.get("/api/pizza").then(({ data }) =>
        ReactDOM.render(<Menu pizzas={data} />, document.getElementById("menu"))
    );
}
