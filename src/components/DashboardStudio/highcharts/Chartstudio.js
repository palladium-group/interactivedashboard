import React,{Component} from 'react'
import {connect} from "react-redux";
import {
    ITEM_MIN_HEIGHT,
} from '../../../components/DHIS/ItemGrid/gridUtil';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core/styles";
import DashboardItem from './visualizer/DashboardItem'
import Button from "@material-ui/core/Button";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {sGetAllCustomDashboards} from "../../../reducers/dashboards";
import NewDashboard from "./components/NewDashboard";
import i18n from '../../ControlBar/Translation'
import {getInstance} from "d2";
const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor:"#f9f9f9",
        minHeight:"80vh"
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border:"1px Solid #ddd",
        width:"99%",
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "10px"
    },
    header: {
        padding:"5px",
        textAlign: 'left',
        color: "#3a3a3a",
        height:"30px",
        fontSize:"18px",
        textOverflow: "ellipsis",
        fontWeight: "700",
        fontFamily:"Roboto"
    }
});
const EXPANDED_HEIGHT = 17;


class ChartStudio extends Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
        this.state= {
            expandedItems: {},
            dashboard: {},
            items:[],
            dashboardTitle:"",
            showNew:false,
            customDashboards:[]
        }
    }
    componentDidMount() {
        getInstance().then(d2 => {
            let api=d2.Api.getApi()
            api.get('dataStore/chart-studio/dashboards').then(result =>{
                this.setState({
                    customDashboards:result
                })
            }).catch(console.error);
        });
    }

    newChart=()=>{
        window.location.href = '/#/studiodesigner/'+this.props.match.params.dashboardId;
    }
    openNewdashboardDialog=()=>{
        this.setState({
            showNew:!this.state.showNew
        })
    }
    dashboardConfig=(dashboards)=>{
        let dashboard={}
        dashboards.dashboards.filter(obj => {
            return obj.id === this.props.match.params.dashboardId?dashboard=obj:null;
        })
        if(dashboard.dashboardItems.length>0){
            let dashboardItems= dashboard.dashboardItems;
            let items= dashboardItems.map(item => {
                const expandedItem = this.state.expandedItems[item.id];
                let hProp = { h: item.chartDimensions.height };

                if (expandedItem && expandedItem === true) {
                    hProp.h = item.chartDimensions.height + EXPANDED_HEIGHT;
                }

                return Object.assign({}, item, hProp, {
                    id:item.id,
                    type:item.chartType,
                    width:item.chartDimensions.width!=undefined?item.chartDimensions.width :500,
                    height:item.chartDimensions.height!=undefined?item.chartDimensions.height :500,
                    minH: ITEM_MIN_HEIGHT,
                });
            })
            this.setState({
                items:items,
                dashboard:dashboard,
                dashboardTitle:dashboard.name.en
            })
        }else{
            this.setState({
                items:[],
                dashboardTitle:dashboard.name.en
            })
        }

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.customDashboards != prevState.customDashboards){
            if( this.state.customDashboards.dashboards.length >0){
                this.dashboardConfig(this.state.customDashboards)
            }
        }
        if(prevProps!=this.props){
            if( this.state.customDashboards.dashboards.length >0){
                this.dashboardConfig(this.state.customDashboards)
            }
        }
        return true
    }


    render() {
        const { classes } = this.props;

       if(this.state.items.length>0 ) return (
            <div className={classes.root} >
                <Grid container style={{width:'100%'}}>
                    <Grid container spacing={0} style={{width:'100%', paddingLeft:"10px", paddingRight:"10px"}}>
                        <Grid item xs={12} sm={6} md={6} lg={6} >
                            <h2 className={classes.header}>
                                {this.state.dashboardTitle}
                            </h2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} >
                            {this.props.isAdmin?
                                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                    <Button
                                        variant="contained"
                                        style={{backgroundColor:"#1976d2", color:"#fff", marginTop:"10px", marginRight:'10px'}}
                                        onClick={this.newChart}
                                        startIcon={<AddBoxIcon/>}
                                    >
                                        {i18n.t('New Chart')}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{backgroundColor:"#1976d2", color:"#fff", marginTop:"10px", marginRight:'10px'}}
                                        onClick={this.openNewdashboardDialog}
                                        startIcon={<AddBoxIcon/>}
                                    >
                                        {i18n.t('New Dashboard')}
                                    </Button>
                                    {this.state.showNew?
                                        <NewDashboard isAdmin={this.props.isAdmin} />
                                        :null}
                                </Grid>
                            :null}

                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        {this.state.items.map(item => {
                                return (
                                    <Grid item>
                                        <Paper className={classes.paper}>

                                            <DashboardItem
                                                key={item.id}
                                                item={item}
                                                width={item.width}
                                                height={item.height}
                                                chartType={item.chartType}
                                                item={item}
                                                dataApi={item.connectioninfo.dataApi}
                                                connectionString={item.connectioninfo.connectionstring}
                                                systemName={item.connectioninfo.systemName}
                                                systemGroup={item.connectioninfo.systemGroup}
                                                chartTitle= {item.chartTitle}
                                                chartDimensions={item.chartDimensions}
                                                chartProperties={item.chartProperties}
                                            />
                                        </Paper>
                                    </Grid>

                                );
                            }
                        )}
                    </Grid>
                </Grid>

            </div>
        )
        if(this.state.items.length<=0 ) return (
            <div className={classes.root} >
                <Grid container style={{width:'100%'}}>
                    <Grid container spacing={0} style={{width:'100%', paddingLeft:"10px", paddingRight:"10px"}}>
                        <Grid item xs={12} sm={6} md={6} lg={6} >
                            <h2 className={classes.header}>
                                {this.state.dashboardTitle}
                            </h2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} >
                                {this.props.isAdmin?
                                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                        <Button
                                            variant="contained"
                                            style={{backgroundColor:"#1976d2", color:"#fff", marginTop:"10px", marginRight:'10px'}}
                                            onClick={this.newChart}
                                            startIcon={<AddBoxIcon/>}
                                        >
                                            {i18n.t('New Chart')}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            style={{backgroundColor:"#1976d2", color:"#fff", marginTop:"10px", marginRight:'10px'}}
                                            onClick={this.openNewdashboardDialog}
                                            startIcon={<AddBoxIcon/>}
                                        >
                                            {i18n.t('New Dashboard')}
                                        </Button>
                                        {this.state.showNew?
                                            <NewDashboard isAdmin={this.props.isAdmin} />
                                            :null}
                                    </Grid>
                                    :null}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


const mapStateToProps=state=>{
    return{
        customDashboards:sGetAllCustomDashboards(state),
    }
}

export default connect(mapStateToProps, null)(withStyles(useStyles)(ChartStudio));
