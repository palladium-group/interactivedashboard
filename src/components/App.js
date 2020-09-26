import React, { Component } from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';

import { EDIT, VIEW, NEW } from './DHIS/Dashboard/dashboardModes';
import { acReceivedUser } from '../actions/user';
import { tFetchDashboards } from '../actions/dashboards';
import { tSetControlBarRows } from '../actions/controlBar';
import { tSetDimensions } from '../actions/dimensions';
import Dashboard from './DHIS/Dashboard/Dashboard';
import ResourcesView from "./Resources/ResourcesView";
import AdminLogin from "./DashboardStudio/AdminLogin";
import 'typeface-roboto';
import './App.css';
import HeaderMenu from "./ControlBar/HeaderMenu";
import { withStyles } from '@material-ui/core/styles';
import {fetchCustomDashboards} from "../configureStore";
import Chartstudio from "./DashboardStudio/highcharts/Chartstudio";
import Designer from "./DashboardStudio/highcharts/Designer";
const useStyles = theme => ({
    content:{
        marginTop:'80px'
    }
});


export class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            isAdmin:false
        }
    }
    componentDidMount() {
        this.props.setCurrentUser(this.props.d2.currentUser);
        this.props.fetchDashboards();
        this.props.setControlBarRows();
        this.props.setDimensions(this.props.d2);
        this.props.fetchCustomDashboards();
    }

    getChildContext() {
        return { baseUrl: this.props.baseUrl, i18n, d2: this.props.d2 };
    }
    isAdmin=()=>{
        this.setState({
            isAdmin:true
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="app-wrapper">
                <div className="dashboard-header-bar">
                    <HeaderMenu/>
                </div>
                <div className={classes.content}>
                    <Router>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <Dashboard {...props} mode={VIEW} />
                                )}
                            />
                            <Route
                                exact
                                path="/dashboards/:dashboardId"
                                render={props => (
                                    <Dashboard {...props} mode={VIEW} />
                                )}
                            />
                            <Route exact path='/resources' render = {
                                props => <ResourcesView d2={this.props.d2} {...props}/>
                            } />
                            <Route exact path='/chartstudio' render = {
                                props => <Chartstudio isAdmin={this.state.isAdmin} d2={this.props.d2} {...props}/>
                            } />
                            <Route exact path='/chartstudio/:dashboardId' render = {
                                props => <Chartstudio isAdmin={this.state.isAdmin} d2={this.props.d2} {...props}/>
                            } />
                            <Route exact path='/studiodesigner/:dashboardId' render = {
                                props =>{
                                    if(this.state.isAdmin){
                                        return <Designer isAdmin={this.state.isAdmin} d2={this.props.d2} {...props}/>
                                    }
                                    return <Redirect to='/'/>
                                }
                            } />
                            <Route exact path='/admin' render = {
                                props => <AdminLogin isAdmin={this.isAdmin}/>
                            } />
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

App.childContextTypes = {
    baseUrl: PropTypes.string,
    i18n: PropTypes.object,
    d2: PropTypes.object,
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCustomDashboards:()=>dispatch(fetchCustomDashboards()),
        setCurrentUser: currentUser => dispatch(acReceivedUser(currentUser)),
        fetchDashboards: () => dispatch(tFetchDashboards()),
        setControlBarRows: () => dispatch(tSetControlBarRows()),
        setDimensions: d2 => dispatch(tSetDimensions(d2)),
    };
};

export default connect(
    null,
    mapDispatchToProps
)( withStyles(useStyles)(App));
