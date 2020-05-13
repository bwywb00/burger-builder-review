import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    UNSAFE_componentWillUpdate() {
        console.log("[OrderSummary Update]");
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map((igKey, i) => {
                return (
                    <li key={igKey + i}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
            })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Check out?</p>
                <Button
                    btnType="Danger"
                    clicked={this.props.purchaseCancelled}
                >
                    CANCEL
            </Button>
                <Button
                    btnType="Success"
                    clicked={this.props.purchaseContinued}
                >
                    CONTINUE
            </Button>
            </Aux>
        )
    }
}

export default OrderSummary;

// const orderSummary = (props) => {

//     const ingredientSummary = Object.keys(props.ingredients)
//         .map((igKey, i) => {
//             return (
//                 <li key={igKey + i}>
//                     <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
//                 </li>
//             )
//         })

//     return (
//         <Aux>
//             <h3>Your Order</h3>
//             <p>A delicious burger with the following ingredients:</p>
//             <ul>{ingredientSummary}</ul>
//             <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
//             <p>Continue to Check out?</p>
//             <Button
//                 btnType="Danger"
//                 clicked={props.purchaseCancelled}
//             >
//                 CANCEL
//             </Button>
//             <Button
//                 btnType="Success"
//                 clicked={props.purchaseContinued}
//             >
//                 CONTINUE
//             </Button>
//         </Aux>
//     );
// }

// export default orderSummary;
