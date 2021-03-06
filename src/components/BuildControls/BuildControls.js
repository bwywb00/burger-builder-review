import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' }
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price}</strong></p>
            {controls.map((ctrl, i) => {
                return (
                    <BuildControl
                        disabled={props.disabled[ctrl.type]}
                        key={i}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                        label={ctrl.label}
                    />
                );
            })}
            <button
                disabled={!props.purchasable}
                className={classes.OrderButton}
                onClick={props.ordered}
            >
                Order Now
            </button>
        </div>
    )
}

export default buildControls;
