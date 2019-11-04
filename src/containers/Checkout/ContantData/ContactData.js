import React, { Component } from 'react';
import classes from './ContactData.css';

import Button from '../../../components/UI/Buttun/Button';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import { contactDataHelper, inputType } from '../ContantData/ContactDataHelper';



class ContactData extends Component {
    state = {
        orderForm: {
            name: contactDataHelper.orderFormElementTextCreator(inputType.input, 'text', 'Your Name', '', 'Name', {
                required: true,
                minLength: 2
            }, false, false),
            street: contactDataHelper.orderFormElementTextCreator(inputType.input, 'text', 'Your Street', '', 'Street', {
                required: true,
                minLength: 2
            }, false, false),
            zipCode: contactDataHelper.orderFormElementTextCreator(inputType.input, 'text', 'Your Zip', '', 'Zip Code', {
                required: true,
                minLength: 5,
                maxLength: 5
            }, false, false),
            contry: contactDataHelper.orderFormElementTextCreator(inputType.input, 'text', 'Your Country', '', 'Country', {
                required: true,
                minLength: 2
            }, false, false),
            email: contactDataHelper.orderFormElementTextCreator(inputType.input, 'email', 'Your mail', '', 'Email', {
                required: true,
                minLength: 2
            }, false, false),
            deliveryMethod: contactDataHelper.orderFormElementDDLCreator(inputType.select, [
                { value: 'fastest', displayValue: 'fastest' },
                { value: 'slowest', displayValue: 'slowest' }
            ], 'fastest', 'Delivery Method',{})
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        var isValid = true;


        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    onChangeHandler(event, inputIdentifier) {
        var updatedOrderForm = { ...this.state.orderForm };
        var updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidity(event.target.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;

        var formIsValid = true;
        for (var identifier in updatedOrderForm) {
            if (!updatedOrderForm[identifier].valid) {
                formIsValid = false;
                break;
            }
        }
        console.log(formIsValid);

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    }

    orderHandler(event) {
        event.preventDefault();

        this.setState({
            loading: true
        })

        const formData = {};
        for (var form in this.state.orderForm) {
            formData[form] = this.state.orderForm[form].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        // .json is obly for fire base!
        axios.post('/orders.json', order)
            .then(res => {
                console.log(res);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render() {
        var formElements = [];

        for (var key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        var form = <form onSubmit={this.orderHandler.bind(this)}>
            {
                formElements.map((formElement) => {
                    return <Input
                        key={formElement.id}
                        touched={formElement.config.touched}
                        valid={formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        label={formElement.config.elementLabel}
                        elementtype={formElement.config.elementType}
                        elementconfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.onChangeHandler(event, formElement.id)} />
                })
            }
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>;

        var render = this.state.loading ? (<Spinner />) : (form);
        return (<div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {render}
        </div>);
    }
}

export default ContactData;