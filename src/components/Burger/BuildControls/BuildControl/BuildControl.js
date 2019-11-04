import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label} style={{
                textTransform: 'capitalize'
            }}>{props.label}</div>
            <button className={classes.Less} onClick={props.removed} disabled={props.amount === 0}>Less</button>
            <button className={classes.More} onClick={props.added}>More</button>
        </div>
    );
};

export default buildControl;