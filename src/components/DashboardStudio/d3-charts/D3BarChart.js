import React,{Component} from "react";
import {apiFetchHelperCsv} from "../../../helpers/apiHelper";
import * as d3 from "d3";
import * as d3Collection from 'd3-collection';

let dataStore=[];
let valueDimension=[];
let seriesDimension=[];
let seriesDimensionItems=[];
let minValue=0;
let maxValue=0
const CSVToJSON = (data, delimiter = ',') => {
    let arr = data.split('\n');
    var jsonObj = [];
    var headers = arr[0].split(',');
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
        if(obj[seriesDimension[0]]!=undefined || obj[seriesDimension[0]]!=null){
            jsonObj.push(obj);
        }

    }
    JSON.stringify(jsonObj);
    return jsonObj
};

class D3BarChart extends Component{
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
        console.log(this.state.d3Data)
        let paddingLeft=Number(this.props.item.itemDimension.paddingLeft)||30 ;
        let paddingRight=Number(this.props.item.itemDimension.paddingRight)||30;
        let paddingBottom=Number(this.props.item.itemDimension.paddingBottom)||30;
        let paddingTop=Number(this.props.item.itemDimension.paddingTop)||30;
        var margin = {top: paddingTop, right: paddingRight, bottom: paddingBottom, left: paddingLeft},
            width = (this.props.width<=100? 150:this.props.width)- margin.left - margin.right,
            height = (this.props.height<=100? 150:this.props.height) - margin.top - margin.bottom;

        var sumstat = d3Collection.nest() // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d[seriesDimension[0]];})
            .rollup(function(d) {
                return d3.sum(
                    d, g =>{ return g[valueDimension[0]]}
                )
            })
            .entries(d3Data)
        maxValue= Math.max(...sumstat.map(o => o.value), 0)+(Math.max(...sumstat.map(o => o.value), 0)*0.15);
        // append the svg object to the body of the page
        var d3Chart = d3.select(this.myRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        const xValue= d => d.value
        const yValue=d=>d.key;


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
            <div ref={this.myRef}></div>
        )
    }
}

export default D3BarChart
