import React,{Component} from "react";
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash'
import {chartTypes} from "./ItemTypes";

HighchartsMore(Highcharts)

let options={
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Average Monthly Temperature and Rainfall in Tokyo'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}',
        },
        title: {
            text: 'Temperature',
        }
    }, { // Secondary yAxis
        title: {
            text: 'Rainfall',
        },
        labels: {
            format: '{value}',
        },
        opposite: true
    }, { // Secondary yAxis
        title: {
            text: 'Rainfall',
        },
        labels: {
            format: '{value}',
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
    },
    series: [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],


    }, {
        name: 'Sea-Level Pressure',
        type: 'spline',
        yAxis: 2,
        data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],


    }, {
        name: 'Temperature',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }]
}

class ComboChart extends Component{
    constructor(props) {
        super(props);
        this.state={
            chartOptions:{},
            columns:[],
            lines:[],
            category:[],
        }
        this.chartRef = React.createRef()
    }
    componentDidMount(): void {
        let options={
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: [],
                crosshair: true
            }],
            yAxis: [{}],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
            },
            series: [{}]
        }
        this.setState({
            chartOptions:options,
            columns:this.props.chartProperties.columns.items,
            lines:this.props.chartProperties.lines.items,
            category:this.props.chartProperties.category.items,
        })
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.chartTitle != prevProps.chartTitle){
            this.chartRef.current.chart.setTitle( {text: this.props.chartTitle} )
            this.chartRef.current.chart.setSubtitle( {text: this.props.chartTitle} )
            return true
        }
        if(this.props.chartProperties != prevProps.chartProperties){
            this.updateChartData(this.props.dataStore, prevProps.chartProperties)
            return true
        }
        if(this.props.chartDimensions !=  prevProps.chartDimensions){
            this.chartRef.current.chart.yAxis[0].setTitle({text: this.props.chartDimensions.chartdimensionyAxis})
            this.chartRef.current.chart.xAxis[0].setTitle({text: this.props.chartDimensions.chartdimensionxAxis})
            return true;
        }
        if(this.props.dataStore != prevProps.dataStore){
            this.updateChartData(this.props.dataStore, prevProps.chartProperties)
            return true
        }
    }

    removeSeriesItem=()=>{
        if(this.chartRef.current.chart.yAxis.length > 0) while(this.chartRef.current.chart.yAxis.length > 0)
            this.chartRef.current.chart.yAxis[0].remove(true);
        this.chartRef.current.chart.addAxis(
            { // Primary yAxis
                labels: {
                    format: '{value}',
                },
                title: {
                    text:'',
                },
                opposite: false
            }
        )
        if(this.chartRef.current.chart.series.length > 0)  while(this.chartRef.current.chart.series.length > 0)
            this.chartRef.current.chart.series[0].remove(true);
    }
    createSeriesItem=(newItems, seriesData)=>{
        //if(newItems.length>0)  this.chartRef.current.chart.update({series:seriesData});

        if(newItems.length>0) seriesData.map(data=>{
            this.chartRef.current.chart.addSeries(data)

        })

    }

    updateYAxisLabels=(seriesDimensions)=>{
        let yAxisLabels=[];
        let x=0
        if(seriesDimensions.length>0)  seriesDimensions.map(dimension=>{
            let chartpostion=x>0?true:false
            this.chartRef.current.chart.addAxis(
                { // Primary yAxis
                    labels: {
                        format: '{value}',
                    },
                    title: {
                        text: dimension.content,
                    },
                    opposite: chartpostion
                }
            )
            x=x+1
        })
        console.log("seriesDimensions yaxxis",yAxisLabels )
        //this.chartRef.current.chart.update({yAxis:yAxisLabels});
    }


    updateChartData=(dataStore ,previousProps)=>{
        let filterDimension = this.props.chartProperties.filterselected.items != undefined && this.props.chartProperties.category.items[0] != undefined ? this.props.chartProperties.category.items[0].content:null;
        let filterItems=this.props.chartProperties.filterselected.items != undefined?this.props.chartProperties.filterselected.items.map(a => a.content):[];
        let seriesDimensions=[]
        this.props.chartProperties.columns.items.map(item=>{
            seriesDimensions.push({type:'column',content:item.content})
        })
        this.props.chartProperties.lines.items.map(item=>{
            seriesDimensions.push({type:'line',content:item.content})
        })



        //this.removeSeriesItem(_.difference(previousSeriesItems, seriesItems))
        this.removeSeriesItem()
        let chartCategory=""
        this.props.chartProperties.category.items.map(category=>{
            chartCategory=category.content
        })
        const categoryItems =filterItems.length<=0?[...new Set(dataStore.map(item => item[chartCategory]))]:filterItems;

        this.chartRef.current.chart.xAxis[0].update( {categories: categoryItems} )
        let x=0;
        let seriesData=seriesDimensions.map(series=>{
            x=x+1;
            return{type:series.type, yAxis: x, name:series.content, data:[]}
        })

        const sortedData = dataStore.sort(
            (a, b) => {
                return categoryItems.indexOf[a.state] - categoryItems.indexOf[b.state]
            }
        )

        //Check if Null
        //sortedData.map(dataRow=>{
        seriesData.map(seriesObj=>{
            let pointValue=0;
            categoryItems.map(category=>{
                // console.log("categoris category", category)
                var categoryValues =  sortedData.filter(function(data) {
                    return data[chartCategory] == category;
                });
                var sum = categoryValues.reduce(function (total, currentValue) {
                    return total + Number(currentValue[seriesObj.name]);
                }, 0);
                seriesObj.data.push(sum)
            })


        })

        console.log("seriesDimensions dimensions",seriesDimensions )
        console.log("seriesDimensions dataa",seriesData )

        //})
        //this.createSeriesItem(_.difference(seriesItems, previousSeriesItems),seriesData)

        this.updateYAxisLabels(seriesDimensions)
        this.createSeriesItem(seriesDimensions,seriesData)

    }

    render(){
        return(
            <React.Fragment>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.chartOptions}
                    ref={this.chartRef}
                />
            </React.Fragment>
        )
    }

}

export default ComboChart
