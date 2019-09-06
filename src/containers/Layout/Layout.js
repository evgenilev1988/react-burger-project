import React, { Component } from 'react';
import Aux from '../Auxiliary';
import classes from './Layout.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            showSideDrawer:false
        }
    }

    sideDrawerClosedHandler(){
        this.setState({
            showSideDrawer:false
        })
    }

    sideDrawerToggleHandler(){
        var toggleSideDrawer = this.state.showSideDrawer;
        this.setState({
            showSideDrawer:!toggleSideDrawer
        });
    }


    render() {
        return (
            <Aux>
                <ToolBar menuClicked={this.sideDrawerToggleHandler.bind(this)}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler.bind(this)}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

export default Layout;