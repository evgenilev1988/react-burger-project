import React from 'react';

import classes from './Input.css';

import {inputType} from '../../../containers/Checkout/ContantData/ContactDataHelper';

const input = (props) => {
    let inputElement = null;
    const inputClass = [classes.inputElement];

    if(props.touched && !props.valid && props.shouldValidate)
    {
        inputClass.push(classes.Invalid)
    }


    switch (props.elementtype) {
        case inputType.input:
            inputElement = <input
                className={inputClass.join(' ')}
                {...props.elementconfig}
                value={props.value} onChange={props.changed}/>;
            break;
        case inputType.select:
            inputElement = <select
                onChange={props.changed}
                className={inputClass.join(' ')} value={props.value}>
                {props.elementconfig.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}</select>;
            break;
        default:
            inputElement = <input
                onChange={props.changed}
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value} />;
            break;
    }

    return (<div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>);
}

export default input;