import React,{Component} from "react";
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash'
import {chartTypes} from './ItemTypes'


HighchartsMore(Highcharts)

const options={

    chart: {
        polar: true
    },

    title: {
        text: ''
    },

    subtitle: {
        text: ''
    },

    pane: {
        startAngle: 0,
        endAngle: 360
    },

    xAxis: {
        tickInterval: 45,
        min: 0,
        max: 360,
        labels: {
            format: '{value}°'
        }
    },

    yAxis: {
        min: 0
    },

    plotOptions: {
        series: {
            pointStart: 0,
            pointInterval: 45
        },
        column: {
            pointPadding: 0,
            groupPadding: 0
        }
    },

    series: []
}
class RadarChart extends Component{
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
        this.setState({
            chartOptions:options,
            series:this.props.chartProperties.series.items,
            category:this.props.chartProperties.category.items,
        })
        //this.chartRef.current.chart.type.setChartType({type:chartTypes[this.props.chartType]})

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

    }

    removeSeriesItem=(removeItems)=>{
        removeItems.map(item=>{
            let seriesItems=this.chartRef.current.chart.series;
            let i=0;
            seriesItems.map((series,key)=>{
                if (removeItems.indexOf(series.name)!= -1 ){
                    console.log("newItems iii",i)
                    this.chartRef.current.chart.series[i].remove()
                };
                i=i+1;
            })
        })
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

        this.removeSeriesItem(_.difference(previousSeriesItems, seriesItems))
        let chartCategory=""
        this.props.chartProperties.category.items.map(category=>{
            chartCategory=category.content
        })
        const categoryItems = [...new Set(dataStore.map(item => item[chartCategory]))];
        this.chartRef.current.chart.xAxis[0].update( {categories: categoryItems} )
        let seriesData=seriesItems.map(series=>{
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
                console.log("categoris category", category)
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
        this.createSeriesItem(_.difference(seriesItems, previousSeriesItems),seriesData)




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

export default RadarChart
