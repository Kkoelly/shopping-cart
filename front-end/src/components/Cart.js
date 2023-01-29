import Item from "./Item.js";

// Display a cart
export function Cart(props) {
  const { items, setError, updateCart, cartQuantity, setQuantity } = props;

  return (
    <div>
      {items.map(
        (item) => (
          console.log(items.length),
          (
            <Item
              item={item}
              setError={setError}
              updateCart={updateCart}
              key={item.id}
              cartQuantity={cartQuantity}
              setQuantity={setQuantity}
            />
          )
        )
      )}
    </div>
  );
}
