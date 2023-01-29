import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHome } from "@fortawesome/free-solid-svg-icons";

import { Error } from "./components/Error.js";
import { Product } from "./components/Product.js";
import { Cart } from "./components/Cart.js";

function App() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [update, setUpdate] = useState(true);
  const [viewCart, setViewCart] = useState(false);
  const [error, setError] = useState("");
  const [cartQuantity, setQuantity] = useState(0);

  //get all products
  const getProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      const sorted_products = response.data.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        return 0;
      });
      setProducts(sorted_products);
    } catch (error) {
      setError("Error getting the products");
    }
  };

  //get the cart
  const getCart = async () => {
    try {
      const response = await axios.get("/api/cart");
      setItems(response.data);
    } catch (error) {
      setError("error getting products in cart");
    }
  };

  const updateCart = () => {
    setUpdate(true);
  };

  useEffect(() => {
    if (update) {
      getCart();
      setUpdate(false);
    }
  }, [update]);

  useEffect(() => {
    getProducts();
  }, []);

  const showCart = (showCart) => {
    setViewCart(showCart);
  };

  return (
    <div className="App">
      <Error error={error} />
      <div className="header">
        <FontAwesomeIcon
          className="icons"
          icon={faHome}
          onClick={() => showCart(false)}
        ></FontAwesomeIcon>
        <h1>Simple Shopping Site</h1>
        <span>
          {cartQuantity}
          <FontAwesomeIcon
            className="icons"
            icon={faShoppingCart}
            onClick={() => showCart(true)}
          ></FontAwesomeIcon>
        </span>
      </div>
      {viewCart ? (
        <>
          <h2>Cart</h2>

          {items.length === 0 ? (
            <p id="empty-cart">Cart is Empty!</p>
          ) : (
            <div className="products">
              <Cart
                items={items}
                setError={setError}
                updateCart={updateCart}
                cartQuantity={cartQuantity}
                setQuantity={setQuantity}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Products</h2>
          <div className="products">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                updateCart={updateCart}
                setError={setError}
                cartQuantity={cartQuantity}
                setQuantity={setQuantity}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
