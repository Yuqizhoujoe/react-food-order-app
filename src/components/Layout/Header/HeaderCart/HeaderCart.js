import React, {useContext, useEffect, useState} from "react";
import CartIcon from "../../../Cart/CartIcon";
import classes from './HeaderCart.module.css';
import CartContext from "../../../../store/cart-context";

const HeaderCart = props => {
    const [btnActive, setBtnActive] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;

    const numOfCartItems = cartCtx.items.reduce((cumulativeNum, item) => {
        return cumulativeNum + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnActive ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) return;
        setBtnActive(true);

        const timer = setTimeout(() => {
            setBtnActive(false);
        }, 300);

        // clean up to clearTimeout
        return () => {
            clearTimeout(timer);
        };

    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numOfCartItems}
        </span>
    </button>;
};

export default HeaderCart;
