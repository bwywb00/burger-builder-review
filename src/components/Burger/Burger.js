import React from 'react';

import classes from './Burger.css'

const burger = (props) => {
    return (
        <div className={classes.Burger}>
            <div>빵</div>
            <div>고기</div>
            <div>고기</div>
            <div>고기</div>
            <div>고기</div>
            <div>빵</div>
        </div>
    );
}

export default burger;
