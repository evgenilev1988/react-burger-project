import React, { Component } from 'react';
import classes from './ContactData.css';

import { connect } from 'react-redux';

import Button from '../../../components/UI/Buttun/Button';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import { contactDataHelper, inputType } from '../ContantData/ContactDataHelper';

import withErrorHandler from '../../../hoc/withErrorHandling/withErrorHanding';
import * as orderActions from '../../../store/actions/order';

import {checkValidity} from '../../../shared/utility';

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
            ], 'fastest', 'Delivery Method', {})
        },
        formIsValid: false,
    }

    onChangeHandler(event, inputIdentifier) {
        var updatedOrderForm = { ...this.state.orderForm };
        var updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = checkValidity(event.target.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;

        var formIsValid = true;
        for (var identifier in updatedOrderForm) {
            if (!updatedOrderForm[identifier].valid) {
                formIsValid = false;
                break;
            }
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    }

    orderHandler(event) {
        event.preventDefault();

        const formData = {};
        for (var form in this.state.orderForm) {
            formData[form] = this.state.orderForm[form].value;
        }

        const order = {
            userId:this.props.userId,
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }

        this.props.onOrderBurger(order,this.props.token);
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

        var render = this.props.loading ? (<Spinner />) : (form);
        return (<div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {render}
        </div>);
    }
}

const mapStateToProps = function (state) {
    return {
        ingredients: state.ings.ingredients,
        totalPrice: state.price.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        onOrderBurger: (orderData,token) => { dispatch(orderActions.purchaseBurderStart(orderData,token)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));