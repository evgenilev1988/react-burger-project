import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for(var ingredient in props.ingredients){
        ingredients.push({
            name:ingredient,
            amount:props.ingredients[ingredient]
        });
    }


    const mappedIng = ingredients.map((ingredient) =>{
    return <span style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            border:'1px solid #ccc',
            padding: '5px'
        }} key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>;
    });


    return(<div className={classes.Order}>
        <p>Ingredients: {mappedIng}</p>
        <p>Price: <strong>USD {props.price}</strong></p>
    </div>);
};

export default order;