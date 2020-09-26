import React from "react";
import NotSupportedItem from "../../dhis2/components/Item/NotSupportedItem/Item";
import D3BarChart from "./D3BarChart"
import D3Boxplot from "./D3Boxplot";
import D3ScatterChart from "./D3ScatterChart";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    itemheader: {
        padding:"5px",
        textAlign: 'left',
        color: "#3a3a3a",
        height:"30px",
        fontSize:"15px",
        textOverflow: "ellipsis",
        fontWeight: "700",
        fontFamily:"Roboto"
    },
}));

const getGridItem = type => {
    switch (type) {
/*        case "Bar-Chart":
            return D3BarChart;
        case "Box-Plot":
            return D3Boxplot;*/
        case "Scatter-Chart":
            return D3ScatterChart;
        default:
            return NotSupportedItem;
    }
};

export const D3Item = props => {
    const classes = useStyles();
    const GridItem = getGridItem(props.dashboardItemType);

    return (
        <React.Fragment>
            <div className={classes.itemheader} >{props.item.itemTitle.en}</div>
            <React.Fragment style={{height:`${props.height}px`, width:`${props.width}px`}}>
            <GridItem
            {...props}
                item={props.item}
                />
            </React.Fragment>

        </React.Fragment>

    );
};
