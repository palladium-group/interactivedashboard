import React, {Component, Fragment} from "react";
import ChartDimension from './components/ChartProperties'
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ChartDimensions from "./components/ChartDimensions";
import PiechartDimensions from "./components/PiechartDimensions";
import ChartProperties from "./components/ChartProperties";

import { makeStyles } from '@material-ui/core/styles';
import ItemHeader from "../../../components/DHIS/Item/ItemHeader";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import PiechartProperties from "./components/PiechartProperties";
import CombochartProperties from "./components/CombochartProperties";
import HeatmapProperties from "./components/HeatmapProperties";

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: 'center',
        color:"#3a3a3a",
        fontSize:"18px",
        fontWeight:"500",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
    },
    item:{
        textAlign: 'left',
        fontSize:"12px",
        userSelect: "none",
        padding: 5,
        margin: "0 0 8px 0",
        minHeight: "20px",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        fontWeight:"bolder",

    },
    accordion:{
        marginBottom:"5px",
        border:"1px Solid #ddd",
        padding:"0px",
        width:"100%"
    },
    accordionItem:{
        width:'100%'
    }
}));

export function Chart_Options(props){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();
    return(
        <div>

            <Accordion className={{root:classes.accordion}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Chart Dimensions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.accordionItem}>
                        <ChartDimensions
                            dataColumns={props.dataColumns}
                            setChartDimensions={props.setChartDimensions}
                        />
                    </div>
                </AccordionDetails>

            </Accordion>
            <Accordion className={{root:classes.accordion}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Chart Properties</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.accordionItem}>
                        <ChartProperties
                            dataColumns={props.dataColumns}
                            setChartProperties={props.setChartProperties}
                        />
                    </div>
                </AccordionDetails>
        </Accordion>
        </div>
    )
}



export function Piechart_Options(props){
    const classes = useStyles();
    return(
        <div>

            <Accordion className={{root:classes.accordion}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Chart Dimensions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.accordionItem}>
                        <PiechartDimensions
                            dataColumns={props.dataColumns}
                            setChartDimensions={props.setChartDimensions}
                        />
                    </div>
                </AccordionDetails>

            </Accordion>
            <Accordion className={{root:classes.accordion}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Chart Properties</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.accordionItem}>
                        <PiechartProperties
                            dataColumns={props.dataColumns}
                            setChartProperties={props.setChartProperties}
                            dataStore={props.dataStore}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}


export function Combochart_Options(props){
    const classes = useStyles();
    return(
        <div>

            <Accordion className={{root:classes.accordion}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Chart Dimensions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.accordionItem}>
                        <ChartDimensions
                            dataColumns={props.dataColumns}
                            setChartDimensions={props.setChartDimensions}
                        />
                    </div>
                </AccordionDetails>

            </Accordion>
            <Accordion className={{root:classes.accordion}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Chart Properties</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.accordionItem}>
                        <CombochartProperties
                            dataColumns={props.dataColumns}
                            setChartProperties={props.setChartProperties}
                            dataStore={props.dataStore}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}




export const radar_chart_options=(props)=>{
    return(
        <div>
            Line Chart
        </div>
    )
}

export const histogram_chart_options=(props)=>{
    return(
        <div>
            Line Chart
        </div>
    )
}

export function Heatmap_Options(props){
    const classes = useStyles();
    return(
        <div>

            <Accordion className={{root:classes.accordion}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Chart Dimensions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.accordionItem}>
                        <ChartDimensions
                            dataColumns={props.dataColumns}
                            setChartDimensions={props.setChartDimensions}
                        />
                    </div>
                </AccordionDetails>

            </Accordion>
            <Accordion className={{root:classes.accordion}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Chart Properties</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.accordionItem}>
                        <HeatmapProperties
                            dataColumns={props.dataColumns}
                            setChartProperties={props.setChartProperties}
                            dataStore={props.dataStore}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export const pyramid_chart_options=(props)=>{
    return(
        <div>
            Line Chart
        </div>
    )
}

export const box_plot_chart_options=(props)=>{
    return(
        <div>
            Line Chart
        </div>
    )
}





export const NotSupportedItem=(props)=>{

    return(
        <Fragment>
            <ItemHeader title={`Item type not supported`} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90%',
                }}
            >
                <NotInterestedIcon
                    style={{ width: 100, height: 100, align: 'center' }}
                    color="disabled"
                />
            </div>
        </Fragment>
    )
}

