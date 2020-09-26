import React,{Component} from 'react'
import {D3Item} from './D3Item';
import {connect} from "react-redux";
import {
    GRID_ROW_HEIGHT,
    GRID_COMPACT_TYPE,
    ITEM_MIN_HEIGHT,
} from '../../dhis2/components/ItemGrid/gridUtil';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core/styles";


const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor:"#f9f9f9",
        minHeight:"80vh"
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});
const EXPANDED_HEIGHT = 17;


class D3Studio extends Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
        this.state={
            expandedItems: {}
        }
    }
    componentDidMount(){
        this.dashboardConfig();
    }
    dashboardConfig=()=>{
        let dashboardItems=this.props.d3Dashboards
        let dashboard={};
        var result = this.props.d3Dashboards.filter(obj => {
            return obj.id === this.props.match.params.dashboardId?dashboard=obj:null;
        })
        return dashboard
    }
    render() {
        const { classes } = this.props;
        let dashboard=this.dashboardConfig();

        const items = dashboard.dashboardItems.map(item => {
            const expandedItem = this.state.expandedItems[item.id];
            let hProp = { h: item.itemDimension.h };

            if (expandedItem && expandedItem === true) {
                hProp.h = item.itemDimension.h + EXPANDED_HEIGHT;
            }

            return Object.assign({}, item, hProp, {
                id:item.id,
                type:item.chartConfig.type,
                width:item.itemDimension.width,
                height:item.itemDimension.height,
                minH: ITEM_MIN_HEIGHT,
            });
        });
        console.log("itemssss",items)
        return (
            <div className={classes.root} >
                <Grid container style={{width:'100%'}}>
                    <Grid container spacing={0} style={{width:'100%', paddingLeft:"10px", paddingRight:"10px"}}>
                        <Grid item xs={2} sm={4} md={4} lg={4} >
                            <h2>{dashboard.name.en}</h2>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        {items.map(item => {
                                const itemClassNames = [
                                    item.type,'view',
                                ].join(' ');

                                return (
                                    <Grid item>
                                        <Paper className={classes.paper}>
                                            <D3Item
                                                key={item.id}
                                                item={item}
                                                width={item.width}
                                                height={item.height}
                                                dashboardItemId={item.id}
                                                dashboardItemType={item.type}
                                            />
                                        </Paper>
                                    </Grid>

                                );
                            }
                        )}
                    </Grid>
                </Grid>

            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        d3Dashboards:state.d3studio.Dashboards
    }
}

export default connect(mapStateToProps, null)(withStyles(useStyles)(D3Studio));

