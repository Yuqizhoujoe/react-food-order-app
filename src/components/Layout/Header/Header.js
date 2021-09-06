import React from "react";

import mealsImg from '../../../assets/meals.jpeg';

import classes from "./Header.module.css";
import HeaderCart from "./HeaderCart/HeaderCart";

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCart onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="A table full od delicious food!"/>
            </div>
        </React.Fragment>
    );
};

export default Header;
