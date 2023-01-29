import axios from "axios";

// This is a simple component that just displays a product.
export function Product(props) {
  const { product, setError, updateCart, cartQuantity, setQuantity } = props;

  const addToCart = async (productID) => {
    try {
      await axios.post(`/api/cart/${productID}`);
      setQuantity(cartQuantity + 1);
      updateCart();
    } catch (error) {
      setError("Error adding product to cart.");
    }
  };

  return (
    <div className="item">
      <img
        src={`./images/products/${product.image}`}
        width="150"
        height="150"
      />
      <p>
        {product.name}, {product.price}
      </p>
      <button
        className="item-button"
        onClick={(e) => {
          addToCart(product.id);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
