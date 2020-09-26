import React, {Component} from "react";
import SourcePanel from "./SourcePanel";
import ChartItemsPanel from "./ChartItemsPanel";
import ChartVisualizer from "./visualizer/ChartVisualizer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import i18n from "../../ControlBar/Translation";
import {getInstance} from "d2";
import {Redirect} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";


const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor:"#f9f9f9",
        minHeight:"80vh",
    },
    accordion:{
        marginBottom:"5px",
        border:"1px Solid #ddd",
        padding:"0px",
        width:"100%"
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border:"1px Solid #ddd",
        width:"100%"
    },
    viewPanel:{
        minHeight:"550px",
    },
    sourcePanel:{
        minHeight:"150px",
        width:"100%"
    },
    propertiesPanel:{
        minHeight:"350px",
        width:"100%"
    },
    heading: {
        textAlign: 'left',
        color:"#3a3a3a",
        height:'30px',
        fontSize:"18px",
        fontWeight:"500",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
    },
    error: {
        textAlign: 'center',
        color:"red",
        height:'14px',
        fontSize:"16px",
        fontWeight:"500",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
    },
    success: {
        textAlign: 'center',
        color:"#3a3a3a",
        height:'14px',
        fontSize:"16px",
        fontWeight:"500",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
    },
});
class Designer extends Component {
    constructor(props) {
        super(props);
        this.state={
            dashboardId:"",
            dataApi:"",
            systemName:"",
            dataStore:[],
            systemGroup:"",
            dataColumns:[],
            chartTitle:"",
            chartType:"",
            chartDimensions:{},
            chartProperties:{},
            showDimensions:false,
            connectioninfo:{},
            errors:"",
            success:""
        }
    }

    componentWillReceiveProps(nextProps, nextContext){
        if(typeof nextProps.dashboards != "undefined"){
            this.urlValidation(nextProps.dashboards)
        }
    }


    shouldComponentUpdate(nextProps, nextState, nextContext){
        if(this.props.match.params.dashboardId != nextProps.match.params.dashboardId ){
            window.location.reload(true);
        }
        return true
    }


    urlValidation=(dashboards)=>{
        if(typeof dashboards != "undefined" && this.state.dashboardId ==""){
            let dashboard=null
            dashboards.filter(obj => {
                return obj.id === this.props.match.params.dashboardId?dashboard=obj:null;
            })

            if(dashboard==null){
                window.location.href = '/#/';
            }
            this.setState({
                dashboardId:this.props.match.params.dashboardId
            })
            return true
        }
    }

    saveChart=()=>{
        let customdashboards=this.props.dashboards;
        let dashboardKey=null
        customdashboards.filter((obj,key) => {
            return obj.id === this.props.match.params.dashboardId?dashboardKey=key:null;
        })
        let dashboardItem={
            connectioninfo:this.state.connectioninfo,
            dataColumns:this.state.dataColumns,
            chartTitle:this.state.chartTitle,
            chartType:this.state.chartType,
            chartDimensions:this.state.chartDimensions,
            chartProperties:this.state.chartProperties
        }
        customdashboards[dashboardKey].dashboardItems.push(dashboardItem)

        let dashboarUpdate={
            update: new Date(),
            version: "1.0.0",
            dashboards:customdashboards,
        }
        const url = `dataStore/chart-studio/dashboards`;
        getInstance().then(d2 => {
                d2.Api.getApi().update(url,dashboarUpdate).then(results=>{
                    this.setState({
                        success:"Your chart has been created successfully"
                    })
                }).catch(error=>{
                    this.setState({
                        errors:"An error has occured during the create process kindly try again"
                    })
                })
        });
    }

    setChartDataSource=(datasourceConfig)=>{
        this.setState({
            ...datasourceConfig
        })
    }

    setChartProperties=(chartProperties)=>{
        this.setState({
            chartProperties:chartProperties
        })
    }
    setChartDimensions=(chartDimensions)=>{
        this.setState({
            chartDimensions:{...chartDimensions}
        })
    }
    setChartType=(chartType)=>{
        this.setState({
            chartType:chartType
        })
    }
    setChartTittle=(chartTitle)=>{
        this.setState({
            chartTitle:chartTitle
        })
    }

    render() {
        const { classes } = this.props;
        if(!this.props.isAdmin){
            return <Redirect to='/'/>
        }
        return (
            <React.Fragment>
                <Grid container style={{width:'100%'}}>
                    <Grid container spacing={0} style={{width:'100%', padding:"10px"}}>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            {i18n.t('New Chart')}
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4} sm={4} md={4} lg={4} >
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <Accordion className={{root:classes.accordion}}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>Data Source Configuration</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Paper className={[classes.paper, classes.sourcePanel]}>
                                                <SourcePanel datasourceConfig={this.setChartDataSource}/>
                                            </Paper>
                                        </AccordionDetails>
                                    </Accordion>
                            </Grid>
                            {this.state.showDimensions?(
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <Accordion className={classes.accordion} style={{marginTop:"10px"}}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>Chart Properties</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Paper className={[classes.paper, classes.propertiesPanel]}>
                                                <ChartItemsPanel
                                                    dataStore={this.state.dataStore}
                                                    dataColumns={this.state.dataColumns}
                                                    chartData={this.state.dataStore}
                                                    setChartProperties={this.setChartProperties}
                                                    setChartDimensions={this.setChartDimensions}
                                                    setChartType={this.setChartType}
                                                    setChartTittle={this.setChartTittle}
                                                />
                                            </Paper>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                                ):null}
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={8} >
                            <Paper className={[classes.paper, classes.viewPanel]}>
                                <Grid container>
                                    <Grid item  md={6}  >
                                        <div style={{padding:"10px"}}>
                                            <span className={classes.error}>{this.state.errors}</span>
                                            <span className={classes.success}>{this.state.success}</span>
                                            <br/>
                                            <br/>
                                        </div>
                                    </Grid>
                                    <Grid item md={6} >
                                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                            <Button
                                                variant="contained"
                                                style={{backgroundColor:"#1976d2", color:"#fff", marginTop:"10px",marginRight:"10px"}}
                                                onClick={this.saveChart}
                                                startIcon={<AddBoxIcon/>}
                                            >
                                                {i18n.t('Save')}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <ChartVisualizer
                                        {...this.state}
                                    />
                                </Grid>

                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>{
    return{
        studio:state.customDashboards,
        dashboards:state.customDashboards.dashboards
    }
}
export default connect(mapStateToProps, null) (withStyles(useStyles)(Designer));
