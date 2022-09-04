import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/Cart.context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckOut] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = ` $ ${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = (userData) => {

    fetch('https://food-delivery-4adc0-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',body:JSON.stringify({
        user:userData,
        orderItems:cartCtx.items
      })
    })
    console.log(userData);
  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modelActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
      {!isCheckout && modelActions}
    </Modal>
  );
};

export default Cart;
