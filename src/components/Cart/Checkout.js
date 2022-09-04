import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  // helper function
 const [formInputValidity, setFormInputValidity] = useState({
    name:true,
    city:true,
    postalCode:true,
    street:true,
 });

  const isEmpty = (value) => value.trim() === "";

  const isFiveCharacter =(value) => value.trim().length !== 5;

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {

    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const validEnteredName = !isEmpty(enteredName);
    const validEnteredCity = !isEmpty(enteredCity);
    const validEnteredStreet = !isEmpty(enteredStreet);
    const validEnteredPostal = !isFiveCharacter(enteredPostal);

    setFormInputValidity({
        name: validEnteredName,
        street:validEnteredStreet,
        postalCode:validEnteredPostal,
        city:validEnteredCity
    });

    const formIsValid = validEnteredName &&  validEnteredCity && validEnteredStreet && validEnteredPostal;

    if(!formIsValid) {
        return;
    }

    props.onConfirm({
        name:enteredName,
        city:enteredCity,
        street:enteredStreet,
        postalCode:enteredPostal
    });

  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Enter Valid Name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Enter Valid Street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postalCode && <p>Enter Valid Postal Code</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Enter Valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confrim</button>
      </div>
    </form>
  );
};

export default Checkout;
