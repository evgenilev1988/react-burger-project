import React, { Component } from 'react';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttun/Button';

import {Redirect} from 'react-router-dom';

import { connect } from 'react-redux';

import { contactDataHelper, inputType } from '../Checkout/ContantData/ContactDataHelper';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';

import {checkValidity} from '../../shared/utility';

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
                password: contactDataHelper.orderFormElementTextCreator(inputType.input, 'password', 'password', '', 'Password', {
                    required: true,
                    minLength: 6
                }, false, false)
            },
            isSignUp: true
        };
    }

    inputChangedHandler(event, controlName) {
        const updatedController = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        this.setState({
            ...this.state,
            controls: updatedController
        });
    }

    componentDidMount(){
        if(!this.props.BuildingBurder && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    switchAuthHandler = () => {
        this.setState({
            ...this.state,
            isSignUp: !this.state.isSignUp
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render() {
        var formElements = [];

        for (var key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElements.map(formElement => {
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

        if (this.props.loading)
            form = <Spinner />;

        let errorMessage = null;
        if (this.props.error !== null) {
            // Firebase returns the error.message property, it can be manually crafted as we want
            errorMessage = (<p>{this.props.error.message}</p>);
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>;
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
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

const mapStateToProps = function (state) {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        BuildingBurder: state.ings.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        onAuth: (email, password, isSignUp) => { dispatch(actions.auth(email, password, isSignUp)) },
        onSetAuthRedirectPath:(path)=>{dispatch(actions.setAuthRedirectPath('/'))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);