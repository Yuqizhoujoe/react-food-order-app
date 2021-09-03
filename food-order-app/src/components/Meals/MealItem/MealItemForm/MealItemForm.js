import classes from './MealItemForm.module.css';
import Input from "../../../UI/Input";
import {useState} from "react";

const MealItemForm = (props) => {
    const [amount, setAmount] = useState('1');
    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();

        if (amount.trim().length === 0 || +amount < 1 || +amount > 5) {
            setAmountIsValid(false);
            return;
        }

        const enteredAmountNumber = +amount;

        props.onAddToCart(enteredAmountNumber);
    };

    const addAmountHandler = event => {
        event.preventDefault();

        const enteredAmount = event.target.value;

        setAmount(enteredAmount);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                onChange={addAmountHandler}
                label="Amount"
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: amount
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter valid amount (1-5).</p>}
        </form>
    );
};

export default MealItemForm;
