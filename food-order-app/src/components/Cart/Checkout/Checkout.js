import classes from './Checkout.module.css';
import {isEmpty, isFiveChars} from "../../../shared/validate";
import useInput from "../../../hooks/useInput";

const Checkout = (props) => {
    const {
        value: name,
        error: nameError,
        inputBlurHandler: nameInputBlurHandler,
        inputChangeHandler: nameInputChangeHandler,
        reset: resetName,
    } = useInput(name => !isEmpty(name));

    const {
        value: street,
        error: streetError,
        inputChangeHandler: streetInputChangeHandler,
        inputBlurHandler: streetInputBlurHandler,
        reset: resetStreet,
    } = useInput(street => !isEmpty(street));

    const {
        value: zipCode,
        error: zipCodeError,
        inputChangeHandler: zipCodeInputChangeHandler,
        inputBlurHandler: zipCodeInputBlurHandler,
        reset: resetZipCode,
    } = useInput(zipCode => isFiveChars(zipCode));

    const {
        value: city,
        error: cityError,
        inputChangeHandler: cityInputChangeHandler,
        inputBlurHandler: cityInputBlurHandler,
        reset: resetCity,
    } = useInput(city => !isEmpty(city));

    let formIsValid = (
        !nameError &&
        !streetError &&
        !zipCodeError &&
        !cityError
    );

    const reset = () => {
        resetName();
        resetStreet();
        resetCity();
        resetZipCode();
    };

    const confirmHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) return;

        const form = {
            name,
            street,
            zipCode,
            city
        };

        props.onSubmitForm(form);
        reset();
    };

    const nameClasses = nameError
        ? `${classes.control} ${classes.invalid}`
        : classes.control;
    const streetClasses = streetError
        ? `${classes.control} ${classes.invalid}`
        : classes.control;
    const zipCodeClasses = zipCodeError
        ? `${classes.control} ${classes.invalid}`
        : classes.control;
    const cityClasses = cityError
        ? `${classes.control} ${classes.invalid}`
        : classes.control;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClasses}>
                <label htmlFor="name">Your name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                />
            </div>
            <div className={streetClasses}>
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    id="street"
                    value={street}
                    onChange={streetInputChangeHandler}
                    onBlur={streetInputBlurHandler}
                />
            </div>
            <div className={zipCodeClasses}>
                <label htmlFor="zip">Zip code</label>
                <input
                    type="text"
                    id="zip"
                    value={zipCode}
                    onChange={zipCodeInputChangeHandler}
                    onBlur={zipCodeInputBlurHandler}
                />
            </div>
            <div className={cityClasses}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={cityInputChangeHandler}
                    onBlur={cityInputBlurHandler}
                />
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confrim</button>
            </div>
        </form>
    );
};

export default Checkout;
