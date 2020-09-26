import React,{Component} from "react";
import * as d3 from 'd3';


class D3ColumnChart extends Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }
    componentDidMount(){
        this.drawChart()
    }
    drawChart=()=>{
        const data =[12,10,79, 90, 100];
        const w=500;
        const h=400;

        const accessToRef=d3.select(this.myRef.current)
            .append("svg")
            .attr("width",w)
            .attr("height",h)
            .style("padding",10)
            .style("margin-left", 10)

        accessToRef.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x",(d,i)=>i*70)
            .attr("y",(d,i)=>h - 10* d)
            .attr("width",65)
            .attr("height",(d,i)=>d*10)
            .attr("fill","tomato")
    }
    render() {
        return (
            <div ref={this.myRef}>
                D3 Stucio
            </div>
        )
    }
}

export default D3ColumnChart
