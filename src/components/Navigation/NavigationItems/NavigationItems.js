import React from 'react';

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems = (props) => (
    <ul className={classes.NavagationItems}>
        <NavigationItem
            link="/"
            active
        >
            Burger Builder
            </NavigationItem>
        <NavigationItem
            link="/"
        >
            Check Out
            </NavigationItem>
    </ul>
);

export default navigationItems;
