import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';


const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {

        event.preventDefault();
        const enterredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enterredAmount;
       
        if(enteredAmountNumber.length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        } 

        props.onAddToCart(enteredAmountNumber);

    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label='Amount'  
                ref={amountInputRef}
                input={{
                    id:'amount',
                    type:'text',
                    min:1,
                    max:5,
                    step:1,
                    defaultValue:1
                }}
            />
            <button> + Add</button>
            {!amountIsValid && <p>Please enter valid amount</p>}
        </form>
    )

}

export default MealItemForm;