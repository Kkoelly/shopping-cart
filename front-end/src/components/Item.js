import { useState, useEffect } from "react";
import "../css/item.css";
import axios from "axios";

// Display an Item
export default function Item(props) {
  const [product, setProduct] = useState([]);
  const { item, setError, updateCart, cartQuantity, setQuantity } = props;

  const decreaseQuantity = async (item) => {
    try {
      await axios.put(`/api/cart/${item.id}/${item.quantity - 1}`);
      setQuantity(cartQuantity - 1);
      updateCart();
    } catch (error) {
      setError("Error updating quantity.");
    }
  };

  const increaseQuantity = async (item) => {
    try {
      await axios.put(`/api/cart/${item.id}/${item.quantity + 1}`);
      setQuantity(cartQuantity + 1);
      updateCart();
    } catch (error) {
      setError("Error updating quantity.");
    }
  };

  const deleteItem = async (item) => {
    try {
      await axios.delete(`/api/cart/${item.id}`);
      setQuantity(cartQuantity - item.quantity);
      updateCart();
    } catch (error) {
      setError("Error deleting item from cart.");
    }
  };

  useEffect(() => {
    // get all of the products
    const getProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${item.id}`);
        setProduct(response.data);
      } catch (error) {
        // if an error occurs, we set that state here
        setError("Error getting a product.");
      }
    };

    getProduct();
  }, [item, setError, updateCart]);

  return (
    <div className="item">
      <img
        src={`./images/products/${product.image}`}
        width="150"
        height="150"
      />
      <p>
        {product.name}, {product.price}{" "}
      </p>
      <div className="quantity">
        <p>Quantity: {item.quantity} </p>
        <div>
          <button onClick={(e) => decreaseQuantity(item)}>-</button>
          <button onClick={(e) => increaseQuantity(item)}>+</button>
        </div>
      </div>
      <button className="item-button" onClick={(e) => deleteItem(item)}>
        Remove from cart
      </button>
    </div>
  );
}
