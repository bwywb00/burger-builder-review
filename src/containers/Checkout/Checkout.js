// BurgerBuilder에서 만든 burger을 다시 보여주고
// 취소할 것인지, 계속 진행할 것인지를 따지는 Component

import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            meat: 4,
            cheese: 1
        }
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        )
    }
}

export default Checkout;
