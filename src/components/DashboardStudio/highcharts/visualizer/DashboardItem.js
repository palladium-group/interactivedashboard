import React,{Component} from "react";
import {NotSupportedItem} from "../ChartOptions";
import Chart from './items/Chart'
import PieChart from "./items/PieChart";
import RadarChart from "./items/RadarChart";
import HeatmapChart from "./items/HeatmapChart";
import BoxplotChart from "./items/BoxplotChart";
import ComboChart from "./items/ComboChart";
import PyramidChart from "./items/PyramidChart";
import {withStyles} from "@material-ui/core/styles";
import { csvtojson} from "../../../../helpers/apihelpers";
import {chartDataFetchHelperCsv} from "../../../../helpers/apihelpers";
const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    itemheader: {
        padding:"5px",
        textAlign: 'left',
        color: "#3a3a3a",
        height:"30px",
        fontSize:"18px",
        textOverflow: "ellipsis",
        fontWeight: "700",
        fontFamily:"Roboto"
    },
});

class DashboardItem extends Component{
    constructor(props) {
        super(props);
        this.state={
            dataStore:[],
            dataColumns: []
        }
    }
    componentDidMount() {
        this.fetchData()
    }

    chartItems=(type)=>{
        switch (type) {
            case 'line_chart':
            case 'area_chart':
            case 'column_chart':
            case 'stacked_column_chart':
            case 'bar_chart':
            case 'stacked_bar_chart':
                return Chart;
            case 'radar_chart':
                return RadarChart
            case 'pie_chart':
                return PieChart
            case 'heatmap_chart':
                return HeatmapChart
            case 'box_plot_chart':
                return BoxplotChart
            case 'combo_chart':
                return ComboChart
            case 'pyramid_chart':
                return PyramidChart
            default:
                return NotSupportedItem;

        }
    }
    IsJsonString=(str)=> {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return JSON.parse(str);
    }

    fetchData=()=>{
        chartDataFetchHelperCsv(this.props.dataApi,this.props.systemGroup,this.props.connectionString)
            .then(result => {
                let dataStore=csvtojson(result.data)
                this.setState({
                    dataStore:dataStore.data,
                    dataColumns: dataStore.headers
                })
            })
    }


    render() {
        const { classes } = this.props;
        const ChartItem = this.chartItems(this.props.chartType);
        return(
        <React.Fragment>
            <div  style={{
                padding:"5px",
                textAlign: 'left',
                color: "#3a3a3a",
                height:"30px",
                fontSize:"15px",
                textOverflow: "ellipsis",
                fontWeight: "700",
                fontFamily:"Roboto"
            }} >
                {this.props.item.chartTitle}
            </div>
            <React.Fragment style={{height:`${this.props.height}px`, width:`${this.props.width}px`}}>
                <div style={{height:`${this.props.height}px`, width:`${this.props.width}px`}}>
                    <ChartItem
                        {...this.props}
                        {...this.state}
                        item={this.props.item}
                        dataStore={this.state.dataStore}s
                    />

                </div>

            </React.Fragment>

        </React.Fragment>
        )
    }

}

export default withStyles(useStyles)(DashboardItem)

