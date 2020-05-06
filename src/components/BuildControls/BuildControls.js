import React from 'react';
import classes from './BuildControls.css';

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <div><span>치즈</span><span>-</span><span>+</span></div>
            <div><span>고기</span><span>-</span><span>+</span></div>
            <div><span>샐러드</span><span>-</span><span>+</span></div>
            <div><span>베이컨</span><span>-</span><span>+</span></div>
        </div>
    )
}

export default buildControls;
