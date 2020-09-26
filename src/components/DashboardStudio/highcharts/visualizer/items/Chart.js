import React,{Component} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash'
import {chartTypes} from './ItemTypes'

class Chart extends Component{
    constructor(props) {
        super(props);
        this.state={
            chartOptions:{},
            series:this.props.chartProperties.series.items,
            category:this.props.chartProperties.category.items,
        }
        this.chartRef = React.createRef()
    }
    componentDidMount() {
        let options={
            chart: {
                type: 'line',
                width:this.props.chartDimensions!=undefined?this.props.chartDimensions.width:500,
                height:this.props.chartDimensions!=undefined?this.props.chartDimensions.height:500
            },
            title: {
                text: ''
            },

            subtitle: {
                text: ''
            },

            yAxis: {
                title: {
                    text: ''
                }
            },

            xAxis: {
                categories:[]
            },

            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            plotOptions: {
                series: {
                    stacking: ''
                }
            },
            series: [],

            responsive: {
                rules: [{
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        }
        options.chart.type=chartTypes[this.props.chartType]
        this.setState({
            chartOptions:options,
            series:this.props.chartProperties.series.items,
            category:this.props.chartProperties.category.items,
        })

        //this.chartRef.current.chart.type.setChartType({type:chartTypes[this.props.chartType]})

    }

    componentDidUpdate(prevProps, prevState, snapshot){

        if(this.props.chartTitle != prevProps.chartTitle){
            this.chartRef.current.chart.setTitle( {text: this.props.chartTitle} )
            this.chartRef.current.chart.setSubtitle( {text: this.props.chartTitle} )
            this.chartRef.current.chart.yAxis[0].setTitle({text: this.props.chartTitle})
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
        if(this.props.chartType != prevProps.chartType){
            this.updateChartData(this.props.dataStore, prevProps.chartProperties)
            return true
        }
        if(this.props.dataStore != prevProps.dataStore){
            this.updateChartData(this.props.dataStore, prevProps.chartProperties)
            return true
        }
        if(this.props.chartDimensions!=prevProps.chartDimensions){
            let update=false;
            if(Number(this.props.chartDimensions.width)>=400){
                update=true
            }
            if(Number(this.props.chartDimensions.height)>=400){
                update=true
            }
            if(update){
                let width= this.props.chartDimensions!=undefined?this.props.chartDimensions.width:500;
                let height= this.props.chartDimensions!=undefined?this.props.chartDimensions.height:500;
                this.chartRef.current.chart.setSize(width,height)
            }
        }
    }

    removeSeriesItem=()=>{
        while(this.chartRef.current.chart.series.length > 0)
            this.chartRef.current.chart.series[0].remove(true);
    }
    createSeriesItem=(newItems, seriesData)=>{
        if(newItems.length>0) seriesData.map(data=>{
            console.log("newItems Run")
            if(newItems.includes(data.name)){
                this.chartRef.current.chart.addSeries(data)
            }

        })

    }

    updateChartData=(dataStore ,previousProps)=>{

        const seriesItems = []
            this.props.chartProperties.series.items.map(x=>{
                seriesItems.push(x.content)
            })
        const previousSeriesItems = []
            previousProps.series.items.map(x=>{
                previousSeriesItems.push(x.content)
            })

        //this.removeSeriesItem(_.difference(previousSeriesItems, seriesItems))
        this.removeSeriesItem()
        let chartCategory=""
        this.props.chartProperties.category.items.map(category=>{
            chartCategory=category.content
        })
        const categoryItems = [...new Set(dataStore.map(item => item[chartCategory]))];

        if(this.props.chartType.includes('stacked')){
            this.chartRef.current.chart.update({ plotOptions: { series: {stacking: 'normal' }}});
        }else{
            this.chartRef.current.chart.update({ plotOptions: { series: {stacking: '' }}});
        }
        this.chartRef.current.chart.update({ chart: { type: chartTypes[this.props.chartType]}});
        this.chartRef.current.chart.xAxis[0].update( {categories: categoryItems} )
        let seriesData=seriesItems.map(series=>{
            //return{type:chartTypes[this.props.chartType],name:series, data:[]}
            return{name:series, data:[]}
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

        //})
        //this.createSeriesItem(_.difference(seriesItems, previousSeriesItems),seriesData)
        this.createSeriesItem(seriesItems,seriesData)

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

export default Chart
