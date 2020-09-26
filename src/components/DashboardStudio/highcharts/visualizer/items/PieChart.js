import React,{Component} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";

class PieChart extends Component{
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
        const options={
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    size:'100%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Series',
                colorByPoint: true,
                data: [{
                    name: 'e',
                    y: 1
                }]
            }]
        }
        this.setState({
            chartOptions:options,
            properties:this.props.chartProperties,
            series:this.props.chartProperties.series.items,
            category:this.props.chartProperties.category.items,
            filters:this.props.chartProperties.filterselected.items
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot){

        if(this.props.chartTitle != prevProps.chartTitle){
            this.chartRef.current.chart.setTitle( {text: this.props.chartTitle} )
            this.chartRef.current.chart.setSubtitle( {text: this.props.chartTitle} )
            return true
        }
        if(this.props.chartProperties != prevProps.chartProperties){
            this.updateChartData(this.props.dataStore)
            return true
        }
        if(this.props.dataStore != prevProps.dataStore){
            this.updateChartData(this.props.dataStore)
        }
        return true
    }


    createSeriesItem=(newItems, seriesData)=>{
        if(newItems.length>0) this.chartRef.current.chart.series[0].setData(seriesData)
    }

    updateChartData=(dataStore)=>{
        let filterDimension = this.props.chartProperties.filterselected.items != undefined && this.props.chartProperties.category.items[0] != undefined ? this.props.chartProperties.category.items[0].content:null;
        let filterItems=this.props.chartProperties.filterselected.items != undefined?this.props.chartProperties.filterselected.items.map(a => a.content):[];
        const seriesItems = []
        let properties=this.props.chartProperties;
        this.props.chartProperties.series.items.map(x=>{
            seriesItems.push(x.content)
        })
        let seriesData=seriesItems.map(series=>{
            return{name:series, y:0}
        })
        seriesData.map(seriesObj=>{
            var sum = dataStore.reduce(function (total, currentValue) {
                if(filterItems.length>0 && filterDimension!=null){
                    if(filterItems.includes(currentValue[filterDimension])){
                        return total + Number(currentValue[seriesObj.name]);
                    }
                    return total;
                }else{
                    return total + Number(currentValue[seriesObj.name]);
                }

            }, 0);
            seriesObj.y=sum
        })
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

export default PieChart
