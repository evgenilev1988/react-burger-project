import React from 'react';
import classes from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    var attachedClass = [classes.SideDrawer,classes.Closed];
    if(props.open)
        attachedClass = [classes.SideDrawer,classes.Open];

    return (
        <Aux>
            <BackDrop show={props.open} closeBackDrop={props.closed}/>
            <div className={attachedClass.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;