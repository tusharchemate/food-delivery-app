import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

const Cart = (props) => {

  const cartItems = (
    <ul>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 34 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>45</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          close
        </button>
        <button className={classes.button}>order</button>
      </div>
    </Modal>
  );
};

export default Cart;
