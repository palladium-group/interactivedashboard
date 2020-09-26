import React,{Component} from "react";
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartChartsFunnel from "highcharts/modules/funnel";
import HighchartsReact from "highcharts-react-official";

HighchartsMore(Highcharts)
HighchartChartsFunnel(Highcharts)



class PyramidChart extends Component{
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
                type: 'pyramid',
                width:this.props.chartDimensions!=undefined?this.props.chartDimensions.width:500,
                height:this.props.chartDimensions!=undefined?this.props.chartDimensions.height:500
            },
            title: {
                text: '',
                x: -50
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> ({point.y:,.0f})',
                        softConnector: true
                    },
                    center: ['40%', '50%'],
                    width: '80%'
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: '',
                data: []
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        plotOptions: {
                            series: {
                                dataLabels: {
                                    inside: true
                                },
                                center: ['50%', '50%'],
                                width: '100%'
                            }
                        }
                    }
                }]
            }
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
        if(this.props.dataStore != prevProps.dataStore){
            this.updateChartData(this.props.dataStore)
        }
        return true
    }

    deleteSeriesData=()=>{
        this.chartRef.current.chart.series[0].data.map((series,key)=>{
            this.chartRef.current.chart.series[0].data[0].remove()
        })
    }
    createSeriesItem=(seriesData)=>{
        this.chartRef.current.chart.series[0].update({ data: seriesData});
    }
    updateChartData=(dataStore)=>{
        this.deleteSeriesData()
        const seriesItems = []
        this.props.chartProperties.series.items.map(x=>{
            seriesItems.push(x.content)
        })
        let chartCategory=""
        this.props.chartProperties.category.items.map(category=>{
            chartCategory=category.content
        })
        const categoryItems = [...new Set(dataStore.map(item => item[chartCategory]))];

        const sortedData = dataStore.sort(
            (a, b) => {
                return categoryItems.indexOf[a.state] - categoryItems.indexOf[b.state]
            }
        )
        let seriesData=[]
        categoryItems.map(category=>{
            var categoryValues =  sortedData.filter(function(data) {
                return data[chartCategory] == category;
            });
            var sum = categoryValues.reduce(function (total, currentValue) {
                return total + Number(currentValue[seriesItems]);
            }, 0);
            seriesData.push([category,sum])
        })
        this.createSeriesItem(seriesData)
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

export default PyramidChart
