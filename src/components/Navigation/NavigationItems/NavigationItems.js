import React from 'react';

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems = (props) => (
    <ul className={classes.NavagationItems}>
        <NavigationItem
            link="/"
            exact
        >
            Burger Builder
            </NavigationItem>
        <NavigationItem
            link="/orders"
        >
            Orders
            </NavigationItem>
    </ul>
);

export default navigationItems;
