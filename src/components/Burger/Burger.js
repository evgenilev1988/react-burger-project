import React from 'react';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient'

import classes from './Burger.css';

const burger = (props) => {
    var transfomedIngrediends = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
                return <BurgerIngridient key={ingredientKey + index} type={ingredientKey} />
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transfomedIngrediends.length === 0) {
        transfomedIngrediends = <p>Please select ingridients</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top" />
            {transfomedIngrediends}
            <BurgerIngridient type="bread-bottom" />
        </div>
    );
};

export default burger;