import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updateIngredient = {
            ...this.state.ingredients
        }
        updateIngredient[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICE[type];

        this.setState({
            ingredients: updateIngredient,
            totalPrice: newPrice
        })
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const newCount = oldCount - 1;
        const updateIngredient = {
            ...this.state.ingredients
        }

        updateIngredient[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICE[type];

        this.setState({
            ingredients: updateIngredient,
            totalPrice: newPrice
        })
    }

    render() {

        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    disabled={disableInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
