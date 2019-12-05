import React, { Component } from 'react';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttun/Button';

import { connect } from 'react-redux';

import { contactDataHelper, inputType } from '../Checkout/ContantData/ContactDataHelper';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                email: contactDataHelper.orderFormElementTextCreator(inputType.input, 'email', 'Mail Address', '', 'E-mail', {
                    required: true,
                    isEmail: true,
                    minLength: 2
                }, false, false),
                password: contactDataHelper.orderFormElementTextCreator(inputType.input, 'password', 'password', '', 'E-mail', {
                    required: true,
                    minLength: 6
                }, false, false)
            },
            isSignUp: true
        };
    }

    checkValidity(value, rules) {
        var isValid = true;


        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isEmail) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler(event, controlName) {
        const updatedController = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        this.setState({
            ...this.state,
            controls: updatedController
        });
    }

    switchAuthHandler = () => {
        this.setState({
            ...this.state,
            isSignUp: !this.state.isSignUp
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render() {
        var formElements = [];

        for (var key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElements.map(formElement => {
            return (
                <Input
                    key={formElement.id}
                    touched={formElement.config.touched}
                    valid={formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    label={formElement.config.elementLabel}
                    elementtype={formElement.config.elementType}
                    elementconfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            );
        })
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                    btnType="Danger" 
                    clicked={this.switchAuthHandler.bind(this)}>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        onAuth: (email, password) => { dispatch(actions.auth(email, password)) }
    }
}

export default connect(null, mapDispatchToProps)(Auth);