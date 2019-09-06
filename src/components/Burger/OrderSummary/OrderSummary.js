import React,{Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import Button from '../../UI/Buttun/Button';

class OrderSummary extends Component {
    render() {
        const ingridientSummary = Object.keys(this.props.ingredients).map((value) => {
            return <li key={value}>
                <span style={{
                    textTransform: 'capitalize'
                }}>{value}: {this.props.ingredients[value]}</span></li>
        });

        return (
            <Aux>
                <h3>Your Order:</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingridientSummary}
                </ul>
                <p>
                    Your Total sum is: <strong>{this.props.totalPay.toFixed(2)}</strong>
                </p>
                <p>
                    Continue to Checkout?
            </p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>PROCEED</Button>
            </Aux>
        );
    }
}

export default OrderSummary;