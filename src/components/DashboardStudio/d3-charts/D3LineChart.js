import React,{Component, useRef} from "react";
import {apiFetchHelperCsv} from "../../../helpers/apiHelper";
import * as d3 from 'd3'
import {map as d3Map, nest as d3Nest} from 'd3-collection'
let dataStore=[];
let valueDimension=[];
let seriesDimension=[];
let seriesDimensionItems=[];
let groupDimension=[];
let groupDimensionItems=[];
let minValue=0;
let maxValue=0

const CSVToJSON = (data, delimiter = ',') => {
    let dataColumns=seriesDimension.concat(valueDimension).concat(groupDimension)
    let arr = data.split('\n');
    var jsonObj = [];
    var headers = arr[0].split(',');
    let difference = headers.filter(x => !dataColumns.includes(x.trim()));
    for(var i = 1; i < arr.length; i++) {
        var dataObj = arr[i].split(',');
        var obj = {};
        for(var j = 0; j < dataObj.length; j++) {
            obj[headers[j].trim()] = dataObj[j].trim();
        }
        if(Number(obj[valueDimension])< minValue){
            minValue=Number(obj[valueDimension])
        }
        if(Number(obj[valueDimension])> maxValue){
            maxValue=Number(obj[valueDimension])
        }
        if(seriesDimensionItems.indexOf(obj[seriesDimension[0]]) === -1 && obj[seriesDimension[0]]!=undefined){
            seriesDimensionItems.push(obj[seriesDimension[0]])
        }
        if(groupDimensionItems.indexOf(obj[groupDimension[0]]) === -1 && obj[groupDimension[0]]!=undefined){
            groupDimensionItems.push(obj[groupDimension[0]])
        }
        for(var j = 0; j < difference.length; j++){
            delete obj[difference[j].trim()]
        }
        jsonObj.push(obj);

    }
    JSON.stringify(jsonObj);
    return jsonObj
};

class D3LineChart extends Component{
    constructor(props) {
        super(props);
        this.state={
            d3Data:[]
        }
        this.myRef = React.createRef()
    }
    componentDidMount(){
        let dataApi=this.props.item.source.api;
        let source=this.props.item.source.dataSource;
        let auth=this.props.item.source.auth;
        let authorization=this.props.item.source.authorization
        apiFetchHelperCsv(dataApi,source,auth,authorization)
            .then(result => {
                valueDimension=this.props.item.chartConfig.config.valueDimension
                seriesDimension=this.props.item.chartConfig.config.seriesDimension
                dataStore=CSVToJSON(result);
                this.setState({
                    d3Data:dataStore
                })
            })
    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.state.d3Data != prevState.d3Data){
            this.d3Chart(this.state.d3Data)
        }
    }

    d3Chart=(d3Data)=>{
        console.log("d3Data)",d3Data)
        let tempData=[10,20,30,40,50,10,20,30,40,50]
        var margin = {top: 10, right: 30, bottom: 30, left: 80},
            width = 900 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var d3Chart = d3.select(this.chartRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let xValue=d=>d[seriesDimension[0]]
        let yValue=d=>d[valueDimension[0]]

        let xAxisLable=seriesDimension[0];
        let yAxisLable=valueDimension[0]



        const xScale=d3.scaleLinear()
            .domain([0,maxValue])
            .range([0,width])
        d3Chart.append('g').call(d3.axisBottom(xScale))
            .attr('transform',`translate(0,${height})`)


        const yScale=d3.scaleBand()
            .domain(sumstat.map(yValue))
            .range([0,height])
            .padding(0.1)
        d3Chart.append('g').call(d3.axisLeft(yScale))


        d3Chart.selectAll('rect')
            .data(sumstat)
            .enter()
            .append('rect')
            .attr('y',d=>yScale(yValue(d)))
            .attr("width",d=>xScale(xValue(d)))
            .attr("height",yScale.bandwidth())
            .attr("fill","steelblue")


        d3Chart.selectAll("text.bar")
            .data(sumstat)
            .enter()
            .append("text")
            .attr("class", "bar")
            .attr("text-anchor", "middle")
            .attr("x", function(d) { return xScale(d.value) + 20; })
            .attr("y", function(d) { return yScale(d.key)+ yScale.bandwidth()/1.5; })
            .text(function(d) { return d.value; });



    }

    render() {
        return (
            <div ref={this.chartRef}>Hello Lie</div>

        )
    }
}

export default D3LineChart
