import React,{Component} from "react";
import * as d3 from 'd3';
import * as d3Collection from 'd3-collection';
import {plotData as data, dhisdata as dhis } from './dataholder'
import {apiFetchHelper} from "../../../helpers/apiHelper";
import {apiFetchHelperCsv} from "../../../helpers/apiHelper";
import _ from 'lodash'
let domianIItems=[];
let minValue=0;
let maxValue=0
class D3Boxplot extends Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }
    componentDidMount(){
        this.dataFetch();
    }
    CSVToJSON = (data, delimiter = ',',categoryDimension,valueDimension) => {
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
            if(domianIItems.indexOf(obj[categoryDimension]) === -1 && obj[categoryDimension]!=undefined) {
                domianIItems.push(obj[categoryDimension])
            }
            jsonObj.push(obj);
        }
        JSON.stringify(jsonObj);
        minValue=minValue>0?minValue-(minValue*0.1):minValue-10
        maxValue=maxValue>=300?maxValue+(maxValue*0.1):maxValue+20;
        console.log(domianIItems)
        return jsonObj
    };
    dataFetch=()=>{
        let dataApi=this.props.item.source.api;
        let source=this.props.item.source.dataSource;
        let auth=this.props.item.source.auth;
        let authorization=this.props.item.source.authorization
        apiFetchHelperCsv(dataApi,source,auth,authorization)
            .then(result => {
                console.log(result)
                let dataObject=this.CSVToJSON(result,',',"Period","Value");
                this.drawChart(dataObject,"Period","Value")

            })
    }
    drawChart=(dataObject=null,categoryDimension=null,valueDimension=null)=>{
        console.log("dataObject",dataObject)
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 80},
            width = (this.props.width<=100? 150:this.props.width)- margin.left - margin.right,
            height = (this.props.height<=100? 150:this.props.height) - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select(this.myRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Read the data and compute summary statistics for each specie
            // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
        // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
        var sumstat = d3Collection.nest() // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d[categoryDimension];})
            .rollup(function(d) {
                let q1 = d3.quantile(d.map(function(g) { return g[valueDimension];}).sort(d3.ascending),.25)
                let median = d3.quantile(d.map(function(g) { return g[valueDimension];}).sort(d3.ascending),.5)
                let q3 = d3.quantile(d.map(function(g) { return g[valueDimension];}).sort(d3.ascending),.75)
                let interQuantileRange = q3 - q1
                let min = q1 - 1.5 * interQuantileRange
                let max = q3 + 1.5 * interQuantileRange
                return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
            })
            .entries(dataObject)



        // Show the X scale
        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(domianIItems)
            .paddingInner(1)
            .paddingOuter(.5)
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

            // Show the Y scale
            var y = d3.scaleLinear()
                .domain([minValue,maxValue])
                .range([height, 0])
            svg.append("g").call(d3.axisLeft(y))

            // Show the main vertical line
            svg
                .selectAll("vertLines")
                .data(sumstat)
                .enter()
                .append("line")
                .attr("x1", function(d){return(x(d.key))})
                .attr("x2", function(d){return(x(d.key))})
                .attr("y1", function(d){return(y(d.value.min))})
                .attr("y2", function(d){return(y(d.value.max))})
                .attr("stroke", "black")
                .style("width", 40)

            // rectangle for the main box
            var boxWidth = 100
            svg
                .selectAll("boxes")
                .data(sumstat)
                .enter()
                .append("rect")
                .attr("x", function(d){return(x(d.key)-boxWidth/2)})
                .attr("y", function(d){return(y(d.value.q3))})
                .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
                .attr("width", boxWidth )
                .attr("stroke", "black")
                .style("fill", "#69b3a2")

            // Show the median
            svg
                .selectAll("medianLines")
                .data(sumstat)
                .enter()
                .append("line")
                .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
                .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
                .attr("y1", function(d){return(y(d.value.median))})
                .attr("y2", function(d){return(y(d.value.median))})
                .attr("stroke", "black")
                .style("width", 80)

        // create a tooltip
        var tooltip = d3.select(this.myRef.current)
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("font-size", "16px")
        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = (d)=> {
            console.log("ddddd",d)
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 1)
            tooltip
                .html("<span style='color:grey'>"+d[categoryDimension]+": </span>" + d[valueDimension]) // + d.Prior_disorder + "<br>" + "HR: " +  d.HR)
                .style("left", (d3.pointer(this)[0]+30) + "px")
                .style("top", (d3.pointer(this)[1]+30) + "px")
        }
        var mousemove = function(d) {
            tooltip
                .style("left", (d3.pointer(this)[0]+30) + "px")
                .style("top", (d3.pointer(this)[1]+30) + "px")
        }
        var mouseleave = function(d) {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0)
        }
        // Add individual points with jitter
        var jitterWidth = 50
        // Color scale
        var myColor = d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([minValue,maxValue])
        svg
            .selectAll("indPoints")
            .data(dataObject)
            .enter()
            .append("circle")
            .attr("cx", function(d){console.log("ddddd",d);return(x(d[categoryDimension]) - jitterWidth/2 + Math.random()*jitterWidth )})
            .attr("cy", function(d){return(y(d[valueDimension]))})
            .attr("r", 4)
            .style("fill", function(d){ console.log("dddddValue",d[valueDimension]);return(myColor(+d[valueDimension])) })
            .attr("stroke", "black")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)


    }
    render() {
        return (
            <div ref={this.myRef}>
            </div>
        )
    }
}

export default D3Boxplot
