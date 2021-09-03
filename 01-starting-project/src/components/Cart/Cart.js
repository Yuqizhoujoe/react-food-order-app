import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import {Fragment, useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout/Checkout";
import useHttp from "../../hooks/useHttp";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmitted, setDidSubmitted] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const {fetchHttpRequest: sendHttpPostRequest, error, isLoading} = useHttp();

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitFormHandler = (form) => {
        setIsSubmitting(true);
        setDidSubmitted(false);
        sendHttpPostRequest(
            {
                url: '/orders.json',
                method: 'post',
                data: JSON.stringify({
                    user: form,
                    orderedItems: cartCtx.items
                })
            },
            (form) => console.log(form)
        );
        setIsSubmitting(false);
        setDidSubmitted(true);
        cartCtx.clear();
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            )}
        </ul>
    );

    let modal = (
        <div className={classes.actions}>
            <button className={classes['button-alt']} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onHideCart} onSubmitForm={submitFormHandler}/>}
            {!isCheckout && modal}
        </Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes['button-alt']} onClick={props.onHideCart}>Close</button>
            </div>
        </Fragment>
    );

    return (
        <Modal onClose={props.onHideCart}>
            {!isSubmitting && !didSubmitted && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmitted && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
