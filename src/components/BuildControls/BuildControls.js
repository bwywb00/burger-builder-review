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
            {controls.map((ctrl, i) => {
                return (
                    <BuildControl
                        key={i}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                    >
                        {ctrl.label}
                    </BuildControl>
                );
            })}
        </div>
    )
}

export default buildControls;
