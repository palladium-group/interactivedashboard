import React,{Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {FormGroup, FormLabel as Label} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
    Chart_Options,
    NotSupportedItem,
    Piechart_Options,
    Combochart_Options,
    Heatmap_Options
} from './ChartOptions'


const useStyles = (theme) => ({
    header: {
        textAlign: 'left',
        color:"#3a3a3a",
        height:'30px',
        fontSize:"18px",
        fontWeight:"500",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        margin:"10px"
    },
    label:{
        width:"20%",
        color:"#3a3a3a",
        textAlign:"left",
        paddingTop:'20px',
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        fontSize:"14px",
        fontWeight:"500",
        marginLeft:"5px",
        textOverflow:'ellipsis'
    },
    textField:{
        width:"70%",
        paddingLeft:"1%",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        fontSize:"14px",
        fontWeight:"500"
    },
    formControl:{
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        fontSize:"14px",
        paddingLeft:"2%",
        paddingTop:"5px",
    }


});
class ChartItemsPanel extends Component{
    constructor(props) {
        super(props);
        this.state={
            chartType:""
        }
    }
    chartGridOptions=(type)=>{
        switch (type) {
            case 'line_chart':
            case 'area_chart':
            case 'stacked_area_chart':
            case 'column_chart':
            case 'stacked_column_chart':
            case 'bar_chart':
            case 'stacked_bar_chart':
                return Chart_Options;
            case 'pie_chart':
                return Piechart_Options;
            case 'combo_chart':
                return Combochart_Options;
            case 'heatmap_chart':
                return Heatmap_Options;
            case 'box_plot_chart':
                return Chart_Options;
            case 'pyramid_chart':
                return Piechart_Options;
            default:
                return NotSupportedItem;
        }
    }
    chartUpdate=(event)=>{
        this.setState({
            chartType:event.target.value
        })
    }
    chartTitle=(event)=>{
        this.props.setChartTittle(event.target.value)
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.chartType != prevState.chartType){
            this.props.setChartType(this.state.chartType)
        }
    }

    render() {
        const { classes } = this.props;
        const ChartGridOptions = this.chartGridOptions(this.state.chartType);
        return(
            <React.Fragment>
                <div>
                    <FormGroup row  >
                        <Label className={classes.label}>
                            Chart Title
                        </Label>
                        <TextField
                            className={classes.textField}
                            id="standard-full-width"
                            style={{ margin: 8 }}
                            placeholder="Data Source System"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.chartTitle}
                        />
                    </FormGroup>
                    <FormGroup row  >
                        <Label className={classes.label}>
                            Chart Type
                        </Label>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                value={this.state.chartType}
                                onChange={this.chartUpdate}
                                className={classes.formControl}
                            >
                                <option value="">Chart Select</option>
                                <option value='line_chart'>Line Chart</option>
                                <option value='area_chart'>Area Chart</option>
                                <option value='stacked_area_chart'>Stacked Area Chart</option>
                                <option value='column_chart'>Column Chart</option>
                                <option value='stacked_column_chart'>Stacked Column Chart</option>
                                <option value='bar_chart'>Bar Chart</option>
                                <option value='stacked_bar_chart'>Stacked Bar Chart</option>
                                <option value='pie_chart'>Pie Chart</option>
                                <option value='combo_chart'>Combo Chart</option>
                                <option value='heatmap_chart'>Heat Map</option>
                                <option value='pyramid_chart'>Pyramid Chart</option>
                                <option value='box_plot_chart'>Box Plot Chart</option>
                            </NativeSelect>
                        </FormControl>
                    </FormGroup>
                    <ChartGridOptions
                        chartType={this.state.chartType}
                        {...this.props}
                    />
                </div>


            </React.Fragment>
        )
    }
}
export default withStyles(useStyles)(ChartItemsPanel)
