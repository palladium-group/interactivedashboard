import React,{Component} from "react";
import {NotSupportedItem} from "../ChartOptions";
import Chart from './items/Chart'
import PieChart from "./items/PieChart";
import HeatmapChart from "./items/HeatmapChart";
import BoxplotChart from "./items/BoxplotChart";
import ComboChart from "./items/ComboChart";
import PyramidChart from "./items/PyramidChart";


class ChartVisualizer extends Component{
    constructor(props) {
        super(props);
    }

    chartItems=(type)=>{
        switch (type) {
            case 'line_chart':
            case 'area_chart':
            case 'stacked_area_chart':
            case 'column_chart':
            case 'stacked_column_chart':
            case 'bar_chart':
            case 'stacked_bar_chart':
                return Chart;
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


    render() {
        const ChartItem = this.chartItems(this.props.chartType);
        return(
            <ChartItem
                {...this.props}
            />
        )
    }

}

export default ChartVisualizer
