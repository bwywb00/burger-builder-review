import React, { Component } from 'react';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div>빵</div>;
                break;
            case ('bread-top'):
                ingredient = <div>빵</div>;
                break;
            case ('meat'):
                ingredient = <div>고기</div>;
                break;
            case ('cheese'):
                ingredient = <div>치즈</div>;
                break;
            case ('bacon'):
                ingredient = <div>베이컨</div>;
                break;
            case ('salad'):
                ingredient = <div>샐러드</div>;
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    }
}

export default BurgerIngredient;
