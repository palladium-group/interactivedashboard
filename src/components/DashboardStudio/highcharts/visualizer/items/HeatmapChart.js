import React,{Component} from "react";
import Highcharts from 'highcharts';
import highchartsHeatMap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";
import isNumber from "d2-utilizr/lib/isNumber";

// init the module
highchartsHeatMap(Highcharts);
function getPointCategoryName(point, dimension) {
    var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
}




class HeatmapChart extends Component{
    constructor(props) {
        super(props);
        this.state={
            chartOptions:{}
        }
        this.chartRef = React.createRef()
    }

    componentDidMount() {
        let options={

            chart: {
                type: 'heatmap',
                marginTop: 10,
                marginBottom: 80,
                plotBorderWidth: 1,
                width:this.props.chartDimensions!=undefined?this.props.chartDimensions.width:500,
                height:this.props.chartDimensions!=undefined?this.props.chartDimensions.height:500
            },


            title: {
                text: ''
            },

            xAxis: {
                categories: []
            },

            yAxis: {
                categories: [],
                title: null,
                reversed: true
            },

            accessibility: {
                point: {
                    descriptionFormatter: function (point) {
                        var ix = point.index + 1,
                            xName = 'x',
                            yName = 'y',
                            val = point.value;
                        return ix + '. ' + xName + ' :' + yName + ', ' + val + '.';
                    }
                }
            },

            colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[0]
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + getPointCategoryName(this.point, 'x') + '</b>  <br><b>' +
                        getPointCategoryName(this.point, 'y')+' : '+this.point.value;
                }
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },
            series: [{
                name: 'Heat Map',
                borderWidth: 1,
                data: [],
                dataLabels: {
                    enabled: true,
                    color: '#000000'
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
            this.updateChartData(this.props.dataStore, prevProps.chartProperties)
            return true
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

    deleteheatmapData=()=>{
        this.chartRef.current.chart.series[0].data.map((series,key)=>{
            this.chartRef.current.chart.series[0].data[0].remove()
        })
    }
    createSeriesItem=(seriesData)=>{
        this.chartRef.current.chart.series[0].update({ data: seriesData});
    }

    updateChartData=(dataStore)=>{
        let filterDimension = this.props.chartProperties.filterselected.items != undefined && this.props.chartProperties.columns.items[0] != undefined ? this.props.chartProperties.columns.items[0].content:null;
        let filterItems=this.props.chartProperties.filterselected.items != undefined?this.props.chartProperties.filterselected.items.map(a => a.content):[];
        let valueDimension=undefined;
        this.props.chartProperties.values.items.map(x=>{
            valueDimension=x.content
        })

        let xAxisCategory=""
        this.props.chartProperties.columns.items.map(x=>{
            xAxisCategory=x.content
        })
        let yAxisCategory=""
        this.props.chartProperties.rows.items.map(x=>{
            yAxisCategory=x.content
        })
        this.deleteheatmapData()

        const xAxisCategoryItems = filterItems.length >0 ?filterItems: [...new Set(dataStore.map(item => item[xAxisCategory]))];
        const yAxisCategoryItems = [...new Set(dataStore.map(item =>item[yAxisCategory]))];
        this.chartRef.current.chart.xAxis[0].update({categories:xAxisCategoryItems})
        this.chartRef.current.chart.yAxis[0].update({categories:yAxisCategoryItems})


        let seriesData=[];

        if(xAxisCategoryItems.length>0 && xAxisCategoryItems[0]!=undefined && yAxisCategoryItems.length>0 && yAxisCategoryItems[0]!=undefined && valueDimension!=undefined) {
            xAxisCategoryItems.map((x, xindex)=>{
            yAxisCategoryItems.map((y,yindex)=>{
                var sum = dataStore.reduce(function (total, currentValue) {
                    if(currentValue[xAxisCategory].includes(x) && currentValue[yAxisCategory].includes(y)){
                        return total+ Number(currentValue[valueDimension]);
                    }
                    return total
                }, 0);
                seriesData.push([xindex,yindex,sum])
            })

        })
            this.createSeriesItem(seriesData)
        }

    }
    render(){
        return (
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

export default HeatmapChart
