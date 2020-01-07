import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

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
                <ToolBar menuClicked={this.sideDrawerToggleHandler.bind(this)} isAuth={this.props.isAuthenticated}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler.bind(this)} isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

const mapStateToPros = state =>{
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToPros)(Layout);