import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Buttun/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    const summarry = props.ingredients ?(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.onCheckoutCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.onCheckoutContinued}>Continue</Button>
        </div>
    ):null;
    return summarry;
}

export default checkoutSummary;