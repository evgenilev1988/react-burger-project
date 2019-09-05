import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
    const controls = Object.keys(props.ingredients).map((ingredient) => {
        return { type: ingredient, amount: props.ingredients[ingredient] }
    })

    return (

        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map(control => {
                    return <BuildControl key={control.type} label={control.type}
                        amount={control.amount}
                        removed={() => props.ingredientRemoved(control.type)}
                        added={() => props.ingredientAdded(control.type)} />
                })
            }

            <button onClick={props.ordered}
                className={classes.OrderButton} disabled={props.purchasable === false}>
                ORDER NOW
                    </button>
        </div>
    );
};

export default buildControls;
