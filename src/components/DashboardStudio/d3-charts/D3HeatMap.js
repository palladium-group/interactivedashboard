import React,{Component} from "react";
import * as d3 from 'd3';
import {map as d3Map} from 'd3-collection'


import {apiFetchHelperCsv} from "../../../helpers/apiHelper";
import _ from 'lodash'
let domianIItems=[];
let minValue=0;
let maxValue=0
class D3HeatMap extends Component{
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
            if(obj[categoryDimension]!=undefined || obj[categoryDimension]!=null){
                jsonObj.push(obj);
            }

        }
        JSON.stringify(jsonObj);
        minValue=minValue>0?minValue-(minValue*0.1):minValue-10
        maxValue=maxValue>=300?maxValue+(maxValue*0.1):maxValue+20;
        console.log(domianIItems)
        return jsonObj
    };
    dataFetch=()=>{
        apiFetchHelperCsv("api/29/analytics.csv?dimension=dx:h2lRF6KvfW6&dimension=ou:LEVEL-4;Nasfuph3Pqw&dimension=pe:LAST_12_MONTHS&displayProperty=SHORTNAME&outputIdScheme=NAME")
            .then(result => {
                console.log(result)
                let dataObject=this.CSVToJSON(result,',',"Period","Value");
                this.drawChart(dataObject,"Period","Organisation unit","Value")

            })
    }
    drawChart=(dataObject=null,categoryDimension,variableDimension,valueDimension)=>{
        console.log("HeatMapData",dataObject)
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 80},
            width = 900 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select(this.myRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
        var myGroups = d3Map(dataObject, function(d){return d[categoryDimension];}).keys()
        var myVars = d3Map(dataObject, function(d){return d[variableDimension];}).keys()

        // Build X scales and axis:
        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(myGroups)
            .padding(0.05);
        svg.append("g")
            .style("font-size", 15)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain").remove()

        // Build Y scales and axis:
        var y = d3.scaleBand()
            .range([ height, 0 ])
            .domain(myVars)
            .padding(0.05);
        svg.append("g")
            .style("font-size", 15)
            .call(d3.axisLeft(y).tickSize(0))
            .select(".domain").remove()

        // Build color scale
        var myColor = d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([minValue,maxValue])

        // create a tooltip
        var tooltip = d3.select(this.myRef.current)
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
            tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
        }
        var mousemove = function(d) {
            let eventData=d.target["__data__"];

            tooltip
                .html("The exact value of<br>this cell is: " + eventData[valueDimension])
                .style("left", (d3.pointer(this)[0]+70) + "px")
                .style("top", (d3.pointer(this)[1]) + "px")
        }
        var mouseleave = function(d) {
            tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.8)
        }

        // add the squares
        svg.selectAll()
            .data(dataObject, function(d) {return d[categoryDimension]+':'+d[variableDimension];})
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d[categoryDimension]) })
            .attr("y", function(d) { return y(d[variableDimension]) })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return myColor(d[valueDimension])} )
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
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

export default D3HeatMap
