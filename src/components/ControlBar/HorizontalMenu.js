import React, { Component } from "react";
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";
import {fade,withStyles} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";

const useStyles = (theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
            width: '100%',
        },
        marginLeft:'5px',
        width: '50%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        marginTop:"5px",
        // vertical padding + font size from searchIcon
        paddingLeft: '25px',
        transition: theme.transitions.create('width'),
        width: '100%'
    },
});

function handleClose(nav) {
    window.location.href = nav;
}
const MenuItem = ({ text, selected }) => {
    return <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>;
};

const  Menu = list =>
    list.map(el => {
        const { name,id } = el;
        return <MenuItem text={name} key={name} onClick={() => {handleClose(`#/dashboards/${id}`)}} />;
    });

const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
};
Arrow.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class HorizontalMenu extends Component {


    constructor(props) {
        super(props);
        this.state = {
            alignCenter: true,
            clickWhenDrag: false,
            dragging: true,
            hideArrows: true,
            hideSingleArrow: true,
            translate: 0,
            transition: 0.4,
            wheel: true,
            dashboardList:[],
            menuItems:{}
        };
        this.menu = null;
    }

    onUpdate = ({ translate }) => {
        //console.log(`onUpdate: translate: ${translate}`);
        this.setState({ translate });
    };

    onSelect = key => {
        //console.log(`onSelect: ${key}`);
        this.setState({ selected: key });
    };

    componentDidUpdate(prevProps, prevState) {
        const { alignCenter } = prevState;
        const { alignCenter: alignCenterNew } = this.state;
        const initialValue = {};

        if (alignCenter !== alignCenterNew) {
            this.menu.setInitial();
        }
        if(prevProps.dashboards != this.props.dashboards){
            const propdashboards = Object.keys(this.props.dashboards).map(i => this.props.dashboards[i])
            this.state.menuItems = Menu(propdashboards.slice(0, propdashboards.length), this.state.selected);         this.setState({
                dashboardList:propdashboards
            })
            return true
        }

    }

    searchMenu=searchString=>{
        const searchList = this.state.dashboardList.filter((list) => JSON.stringify(list)
            .toLowerCase()
            .indexOf(searchString.toLowerCase()) !== -1
        )
        this.setState({
            menuItems:Menu(searchList.slice(0, searchList.length), this.state.selected)
        })

    }
    setItemsCount = ev => {
        const { itemsCount = this.state.dashboardList.length, selected } = this.state;
        const val = +ev.target.value;
        const itemsCountNew =
            !isNaN(val) && val <= this.state.dashboardList.length && val >= 0
                ? +ev.target.value
                : this.state.dashboardList.length;
        const itemsCountChanged = itemsCount !== itemsCountNew;

        if (itemsCountChanged) {
            this.state.menuItems = Menu(this.state.dashboardList.slice(0, itemsCountNew), selected);
            this.setState({
                itemsCount: itemsCountNew
            });
        }
    };

    setSelected = ev => {
        const { value } = ev.target;
        this.setState({ selected: String(value) });
    };

    render() {
        const {
            alignCenter,
            clickWhenDrag,
            hideArrows,
            dragging,
            hideSingleArrow,
            selected,
            translate,
            transition,
            wheel
        } = this.state;
        const { classes } = this.props;
        const menu = this.menuItems;

        const checkboxStyle = {
            margin: "5px 10px"
        };
        const valueStyle = {
            margin: "5px 10px",
            display: "inline-block"
        };


        return (
            <div className="dashboard-menu row">
                <Grid container spacing={0} >
                    <Grid item xl={10} lg={10} md={9} sm={9} xs={9}>
                        <div className="navbar-horizontal dashboard-menu ">
                            <ScrollMenu
                                ref={el => (this.menu = el)}
                                data={this.state.menuItems}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                hideArrows={hideArrows}
                                hideSingleArrow={hideSingleArrow}
                                transition={+transition}
                                onUpdate={this.onUpdate}
                                onSelect={this.onSelect}
                                selected={selected}
                                translate={translate}
                                alignCenter={alignCenter}
                                dragging={dragging}
                                clickWhenDrag={clickWhenDrag}
                                wheel={wheel}
                            />
                        </div>
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={3} xs={3}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={e => this.searchMenu(e.target.value)}
                            />
                        </div>
                    </Grid>
                </Grid>


            </div>

        );
    }
}
const mapStateToProps=state=>{
    return{
        dashboards: state.dashboards.byId
    }
}
export default connect(mapStateToProps,null) (withStyles(useStyles) (HorizontalMenu));

