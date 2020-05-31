// DB에서 ingredients의 정보를 가지고 오자

import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,

        // ingredients를 가져오는 상황에서 error가 발생했을 경우
        // 이 error가 true가 된다
        error: false
    }

    // **주소가 잘못되어도 withErrorHandler에서 설정한 Error message가 나타나지 않는다. 왜?
    // **ComponentDidMount()는 자식 Component가 모두 render된 뒤에야 작동하는 메소드인데
    // **withErrorHandler의 ComponentDidMount() 메소드가 제 역할을 하기 전에 child Component(BurgerBuilder)에서 에러가 발생한다
    // **(= axios.interceptors가 setup되기 전에 이미 error가 발생하는 상황)
    componentDidMount() {
        axios.get('https://burger-builder-review.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({
                    ingredients: res.data
                })
            })
            .catch(error => {
                // 에러가 발생했음을 알려 
                // burgerBuilder 대신에 에러 메세지를 나타나게 함
                this.setState({ error: true })
            })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => { return ingredients[igKey]; })
            .reduce((sum, el) => { return sum + el; }, 0);

        this.setState({ purchasable: sum > 0 })
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
        this.updatePurchaseState(updateIngredient);
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
        this.updatePurchaseState(updateIngredient);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('You Contiune');
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
            customer: {
                name: 'Sung',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Korea',
                },
                email: 'test@test.com'
            },
            devliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            });
    }

    render() {

        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        const price = this.state.totalPrice.toFixed(2);

        let orderSummary = null;

        // DB에서 ingredients의 정보를 가지고 오기전까지 this.state.ingredients 는 에러를 발생한다 
        // 따라서, ingredients가 undefined일 때 처리를 해주자
        let burger = this.state.error ? <p>Ingredients loading error</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        disabled={disableInfo}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        price={price}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={price}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
