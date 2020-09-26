import React,{Component} from "react";


import * as d3 from 'd3';
import {map as d3Map} from 'd3-collection'
import data from './areacsv'

import {apiFetchHelperCsv} from "../../../helpers/apiHelper";
import _ from 'lodash'
let domianIItems=[];
let minValue=0;
let maxValue=0
let stackedDimension=[];
let seriesDimension=[];
let seriesDimensionItems=[];
class D3StackedAreaChart extends Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }

    componentDidMount() {

        d3.csv(data).then(function(data) {
            alert("ennee")
            console.log(data)
            alert("ennee")
            return { date : d3.timeParse("%Y-%m-%d")(data.date), value : data.value }
        }).catch(function(err) {
            throw err;
        })
        this.dataFetch();
    }
    CSVToJSON = (data, delimiter = ',') => {
        let dataColumns=seriesDimension.concat(stackedDimension)
        let arr = data.split('\n');
        var jsonObj = [];
        var headers = arr[0].split(',');
        let difference = headers.filter(x => !dataColumns.includes(x.trim()));
        console.log("diffff",difference)
        for(var i = 1; i < arr.length; i++) {
            var dataObj = arr[i].split(',');
            var obj = {};
            for(var j = 0; j < dataObj.length; j++) {
                obj[headers[j].trim()] = dataObj[j].trim();
            }
            if(seriesDimensionItems.indexOf(obj[seriesDimension[0]]) === -1 && obj[seriesDimension[0]]!=undefined){
                seriesDimensionItems.push(obj[seriesDimension[0]])
            }
            for(var j = 0; j < difference.length; j++){
                delete obj[difference[j].trim()]
            }
            jsonObj.push(obj);

        }
        JSON.stringify(jsonObj);
        console.log("diffff",difference)
        console.log("diffff",jsonObj)
        return jsonObj
    };
    dataFetch=()=>{
        apiFetchHelperCsv("api/29/analytics.csv?dimension=dx:h2lRF6KvfW6;raQGlc1BwMn;dx7kj3Eyssf;zfkXo9v5I6H;NMuFQK37EJO;m8EZzbOVmn6;EFOUogFKfYz;h7852TmWbPW;uY0mUZVjVWR;BhI2vS2hZaG;PibtApiuNk1&dimension=ou:LEVEL-4;Nasfuph3Pqw&dimension=pe:LAST_12_MONTHS&displayProperty=SHORTNAME&tableLayout=true&columns=dx&rows=ou;pe")
            .then(result => {
                console.log(result)
                seriesDimension=["periodname"]
                stackedDimension=["SM- ANCs"]
                let dataObject=this.CSVToJSON(result);
                this.drawChart(dataObject)

            })
    }
    dataD= async (daata)=>{
        return { date : d3.timeParse("%Y-%m-%d")(daata.date), value : daata.value }
    }
    drawChart=(dataObject=null)=>{
// set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 50},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
        var svg = d3.select(this.myRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

//Read the data
        d3.csv(data


) .then(
            // Now I can use this dataset:
                async function(data){
                    let dataS= await this.dataD(data)
                console.log("datass",dataS);
                // Add X axis --> it is a date format
                var x = d3.scaleBand()
                    .domain(d3.extent(data, function(d) { return d.date; }))
                    .range([ 0, width ]);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([0, d3.max(data, function(d) { return +d.value; })])
                    .range([ height, 0 ]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Add the area
                svg.append("path")
                    .datum(data)
                    .attr("fill", "#cce5df")
                    .attr("stroke", "#69b3a2")
                    .attr("stroke-width", 1.5)
                    .attr("d", d3.area()
                        .x(function(d) { return x(d.date) })
                        .y0(y(0))
                        .y1(function(d) { return y(d.value) })
                    )

            }
)



    }
    render() {
        return (
            <div ref={this.myRef} >
            </div>
        )
    }
}

export default D3StackedAreaChart
