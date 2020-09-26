import React,{Component} from "react";
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash'

HighchartsMore(Highcharts)
Array.prototype.median = function () {
    return this.slice().sort((a, b) => a - b)[Math.floor(this.length / 2)];
};


class BoxplotChart extends Component{
    constructor(props) {
        super(props);
        this.state={
            chartOptions:{},
            median:0
        }
        this.chartRef = React.createRef()
    }
    componentDidMount() {
        let options={

            chart: {
                type: 'boxplot',
                width:this.props.chartDimensions!=undefined?this.props.chartDimensions.width:500,
                height:this.props.chartDimensions!=undefined?this.props.chartDimensions.height:500
            },

            title: {
                text: ''
            },

            legend: {
                enabled: false
            },

            xAxis: {
                categories: [],
                title: {
                    text: ''
                }
            },

            yAxis: [{id: 'yA0'}],

            series: [{
                name: 'Quartiles',
                data: [ ],
                tooltip: {
                    headerFormat: '<em>{point.key}</em><br/>'
                }
            }, {
                name: 'Values',
                color: Highcharts.getOptions().colors[0],
                type: 'scatter',
                data: [  ],
                marker: {
                    fillColor: 'white',
                    lineWidth: 1,
                    lineColor: Highcharts.getOptions().colors[0]
                },
                tooltip: {
                    pointFormat: 'Value: {point.y}'
                }
            }]

        }
        this.setState({
            chartOptions:options
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot){

        if(this.props.chartTitle != prevProps.chartTitle){
            this.chartRef.current.chart.setTitle( {text: this.props.chartTitle} )
            return true
        }
        if(this.props.chartProperties != prevProps.chartProperties){
            this.updateChartData(this.props.dataStore)
            return true
        }

        if(this.props.chartType != prevProps.chartType){
            this.updateChartData(this.props.dataStore)
            return true
        }
        if(this.props.dataStore != prevProps.dataStore){
            this.updateChartData(this.props.dataStore)
            return true
        }
        if(this.props.chartDimensions !=  prevProps.chartDimensions){
            this.chartRef.current.chart.yAxis[0].setTitle({text: this.props.chartDimensions.chartdimensionyAxis})
            this.chartRef.current.chart.xAxis[0].setTitle({text: this.props.chartDimensions.chartdimensionxAxis})
            return true;
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
    deletechartData=()=>{
        this.chartRef.current.chart.series[0].data.map((series,key)=>{
            this.chartRef.current.chart.series[0].data[0].remove()
        })
        this.chartRef.current.chart.series[1].data.map((series,key)=>{
            this.chartRef.current.chart.series[1].data[0].remove()
        })
    }
    createSeriesItem=(quartiles,seriesData)=>{
        this.chartRef.current.chart.series[0].update({ data: quartiles});
        this.chartRef.current.chart.series[1].update({ data: seriesData});
    }
    quartile=(data, q)=> {
        data=data.sort(
            (a, b) => {
                return data.indexOf[a.state] - data.indexOf[b.state]
            }
        )
        var pos = ((data.length) - 1) * q;
        var base = Math.floor(pos);
        var rest = pos - base;
        if( (data[base+1]!==undefined) ) {
            return data[base] + rest * (data[base+1] - data[base]);
        } else {
            return data[base];
        }
    }



    updateChartData=(dataStore)=>{
        const seriesItems = []
        this.props.chartProperties.series.items.map(x=>{
            seriesItems.push(x.content)
        })

        let chartCategory=""
        this.props.chartProperties.category.items.map(category=>{
            chartCategory=category.content
        })
        const categoryItems = [...new Set(dataStore.map(item => item[chartCategory]))];
        this.chartRef.current.chart.xAxis[0].update({categories:categoryItems})

        this.deletechartData()
        let quartiles=[]
        let seriesData=[];
        let allValues=[]
       categoryItems.map((category,index)=>{
            let categoryData=[]
            var categoryValues =  dataStore.filter(function(data) {
                return data[chartCategory] == category;
            });
            categoryValues.map((value,key)=>{
                allValues.push(Number(value[seriesItems]))
                categoryData.push(Number(value[seriesItems]))
                seriesData.push([index,Number(value[seriesItems])])
            })
           let q1=this.quartile(categoryData,0.25)
           let q2=this.quartile(categoryData,0.5)
           let q3=this.quartile(categoryData,0.75)
           let low=Math.min(...categoryData)
           let high=Math.max(...categoryData)
           quartiles.push([
               low,q1,q2,q3,high
           ])
        })
        let median=allValues.median()


        this.chartRef.current.chart.get('yA0').removePlotLine('avg');
        this.chartRef.current.chart.get('yA0').addPlotLine({
            id: 'avg',
            value: median,
            color: 'red',
            dashStyle: 'dash',
            width: 1,
            label: {
                text: "Theoretical mean:"+median
            },
            zIndex: 4
        });

        this.createSeriesItem(quartiles,seriesData)




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

export default BoxplotChart
