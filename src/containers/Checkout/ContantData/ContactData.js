import React, { Component } from 'react';
import classes from './ContactData.css';

import Button from  '../../../components/UI/Buttun/Button';

class ContactData extends Component{
    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        }
    }

    render(){
        return(
        <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Name"/>
                    <input type="text" name="email" placeholder="Email"/>
                    <input type="text" name="street" placeholder="Street"/>
                    <input type="text" name="postalCode" placeholder="Postal Code"/>
                </form>
                <Button btnType="Success">ORDER</Button>
            </div>
        );
    }
}

export default ContactData;