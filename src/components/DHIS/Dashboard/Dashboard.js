import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tSelectDashboard } from '../../../actions/dashboards';
import { sDashboardsIsFetching } from '../../../reducers/dashboards';
import ViewDashboard from './ViewDashboard';
import HorizontalMenu from "../../ControlBar/HorizontalMenu";

class Dashboard extends Component {
    setDashboard = () => {
        if (this.props.dashboardsLoaded) {
            const id = this.props.match.params.dashboardId || null;

            this.props.selectDashboard(id);

            this.scrollToTop();
        }
    };

    scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    componentDidMount() {
        this.setDashboard();
    }

    componentDidUpdate() {
        this.setDashboard();
    }

    render() {
        return (
            <React.Fragment>
                <HorizontalMenu/>
                <ViewDashboard />
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return { dashboardsLoaded: !sDashboardsIsFetching(state) };
};

export default connect(
    mapStateToProps,
    {
        selectDashboard: tSelectDashboard,
    }
)(Dashboard);
