import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad' },
    { label: 'Cheese' },
    { label: 'Meat' },
    { label: 'Bacon' }
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {controls.map((obj, i) => {
                return <BuildControl key={i}>{obj.label}</BuildControl>
            })}
        </div>
    )
}

export default buildControls;
