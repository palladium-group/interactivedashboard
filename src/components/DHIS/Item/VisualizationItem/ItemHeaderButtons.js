import React, { Component, Fragment } from 'react';
import MessageIcon from '@material-ui/icons/Message';
import TableIcon from '@material-ui/icons/ViewList';
import ChartIcon from '@material-ui/icons/InsertChart';
import MapIcon from '@material-ui/icons/Public';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import { extractFavorite } from './plugin';
import ItemHeaderButton from '../ItemHeaderButton';
import {
    VISUALIZATION_TYPE_TABLE,
    VISUALIZATION_TYPE_CHART,
    VISUALIZATION_TYPE_MAP,
    itemTypeMap,
    CHART,
    MAP,
    REPORT_TABLE,
    EVENT_CHART,
    EVENT_REPORT,
    DOMAIN_TYPE_AGGREGATE,
    CHART_TYPE_SINGLE_VALUE,
} from '../../../../modules/itemTypes';
import './itemHeader.css'
import { colors, theme } from '@dhis2/ui-core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import styled from "styled-components";
import GridOnIcon from '@material-ui/icons/GridOn';
import { blue } from '@material-ui/core/colors';
const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: transparent;
  }
`;

const DialogContent = MuiDialogContent;
const style = {
    iconBase: {
        width: '24px',
        height: '24px',
        fill: colors.grey500,
    },
    buttonBase: {
        padding: '5px 6px 3px 6px',
    },
    buttonDisabled: {
        padding: '5px 6px 3px 6px',
        opacity: 0.5,
        cursor: 'unset',
    },
    toggleFooterPadding: {
        padding: '7px 6px 1px 6px',
    },
    border: {
        borderRadius: '2px',
        border: `1px solid ${colors.grey200}`,
    },
};

const baseStyle = {
    icon: style.iconBase,
    container: style.buttonBase,
};

const disabledStyle = {
    icon: style.iconBase,
    container: style.buttonDisabled,
};

const activeStyle = {
    icon: { ...style.iconBase, fill: theme.primary800 },
    container: {
        ...style.buttonBase,
        backgroundColor: theme.primary100,
    },
};

const inactiveStyle = disabled => (disabled ? disabledStyle : baseStyle);

const tableBtnStyle = (activeType, disabled) =>
    [REPORT_TABLE, EVENT_REPORT].includes(activeType)
        ? activeStyle
        : inactiveStyle(disabled);

const chartBtnStyle = (activeType, disabled) =>
    [CHART, EVENT_CHART].includes(activeType)
        ? activeStyle
        : inactiveStyle(disabled);

const mapBtnStyle = (activeType, disabled) =>
    [MAP].includes(activeType) ? activeStyle : inactiveStyle(disabled);

export const getItemTypeId = (itemTypeMap, visualizationType, domainType) => {
    const item = Object.values(itemTypeMap).find(
        item =>
            item.visualizationType === visualizationType &&
            item.domainType === domainType
    );
    return item.id;
};

// TODO: Import this from @dhis2/analytics when available
const isSingleValue = (itemType, chartType) =>
    itemType === VISUALIZATION_TYPE_CHART &&
    chartType === CHART_TYPE_SINGLE_VALUE;

class VisualizationItemHeaderButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogStatus: false,
        };
    }
    handleClickOpen = () => {
        this.setState({
            dialogStatus: true,
        });
    };
    handleClose = () => {
        this.setState({
            dialogStatus: false,
        });
    };

    renderInterpretationButton() {
        const { activeFooter, onToggleFooter } = this.props;

        const toggleFooterBase = activeFooter ? activeStyle : baseStyle;

        const toggleFooter = {
            ...toggleFooterBase,
            container: {
                ...toggleFooterBase.container,
                ...style.toggleFooterPadding,
                ...style.border,
            },
        };

        return (
            <Fragment>
                <ItemHeaderButton
                    style={toggleFooter.container}
                    onClick={onToggleFooter}
                >
                    <MessageIcon style={toggleFooter.icon} />
                </ItemHeaderButton>
            </Fragment>
        );
    }

    renderVisualizationButtons() {
        const {
            item,
            visualization,
            onSelectVisualization,
            activeType,
        } = this.props;

        if (isSingleValue(item.type, visualization.type)) {
            return null;
        }

        const domainType = itemTypeMap[item.type].domainType;

        const onViewTable = () =>
            onSelectVisualization(
                getItemTypeId(itemTypeMap, VISUALIZATION_TYPE_TABLE, domainType)
            );

/*        const onViewChart = () =>
            onSelectVisualization(
                getItemTypeId(itemTypeMap, VISUALIZATION_TYPE_CHART, domainType)
            );*/

        const onViewChart = (visualSwitchType=null) =>
            onSelectVisualization(
                getItemTypeId(
                    itemTypeMap,
                    VISUALIZATION_TYPE_CHART,
                    domainType
                ),
                visualSwitchType
            );

        const onViewMap = () =>
            onSelectVisualization(
                getItemTypeId(itemTypeMap, VISUALIZATION_TYPE_MAP, domainType)
            );

        // disable toggle buttons
        let disabled = false;

        if (item.type === VISUALIZATION_TYPE_CHART) {
            if (extractFavorite(item).type.match(/^YEAR_OVER_YEAR/)) {
                disabled = true;
            }
        }

        return (
            <div style={{ marginLeft: 10 }}>
                <div style={style.border}>
                    <ItemHeaderButton
                        disabled={disabled}
                        onClick={this.handleClickOpen}
                    >
                        <InsertChartIcon  style={{ color: blue[500] }} />
                    </ItemHeaderButton>
                    <StyledDialog
                        onClose={this.handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={this.state.dialogStatus}
                        fullWidth={false}
                        autoDetectWindowHeight={false}
                        autoScrollBodyContent={false}
                        maxWidth='false'
                        PaperProps={{
                            style: {
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            },
                        }}
                        elevation={0}
                        modal={true}
                    >
                        <div className='menu-holder' >
                            <DialogContent dividers>
                                <div className='menu-bar'>

                                    <a title="Column chart" >
                                        <img  alt="" className="menu-icon" src="/img/column.png"  onClick={()=>onViewChart('COLUMN')}/>
                                        <div className='menu-title'>
                                            Column chart
                                        </div>
                                    </a>
                                    <a   title="Line chart">
                                        <img  alt="" className="menu-icon" src="/img/line.png" onClick={()=>onViewChart('LINE')}/>
                                        <div className='menu-title'>
                                            Line chart
                                        </div>
                                    </a>
                                    <a  title="Bar chart">
                                        <img  alt="" className="menu-icon" src="/img/bar.png" onClick={()=>onViewChart('BAR')}/>
                                        <div className='menu-title'>
                                            Bar chart
                                        </div>
                                    </a>
                                    <a  title="Area chart">
                                        <img  alt="" className="menu-icon" src="/img/area.png" onClick={()=>onViewChart('AREA')}/>
                                        <div className='menu-title'>
                                            Column chart
                                        </div>
                                    </a>
                                    <a  title="Pie chart">
                                        <img  alt="" className="menu-icon" src="/img/pie.png" onClick={()=>onViewChart('PIE')}/>
                                        <div className='menu-title'>
                                            Pie chart
                                        </div>
                                    </a>
                                    <a  title="stacked column chart">
                                        <img  alt="" className="menu-icon"  src="/img/stacked-column.png" onClick={()=>onViewChart('STACKED_COLUMN')}/>
                                        <div className='menu-title'>
                                            stacked column chart
                                        </div>
                                    </a>
                                    <a  title="stacked bar chart">
                                        <img  alt="" className="menu-icon" src="/img/stacked-bar.png" onClick={()=>onViewChart('STACKED_BAR')}/>
                                        <div className='menu-title'>
                                            stacked bar chart
                                        </div>
                                    </a>
                                    <a  title="Gauge chart">
                                        <img  alt="" className="menu-icon" src="/img/gauge.png" onClick={()=>onViewChart('GAUGE')}/>
                                        <div className='menu-title'>
                                            Gauge chart
                                        </div>
                                    </a>

                                    <a  title="Radar chart">
                                        <img  alt="" className="menu-icon" src="/img/radar.png" onClick={()=>onViewChart('RADAR')}/>
                                        <div className='menu-title'>
                                            Radar chart
                                        </div>
                                    </a>
                                    <a  title="Table chart">
                                        <GridOnIcon className="menu-icon" onClick={onViewTable} style={{fontSize:70, color:'#0082d6',marginLeft:"15px" }} />
                                        <div className='menu-title'>
                                            Pivot Table
                                        </div>
                                    </a>

                                    {domainType === DOMAIN_TYPE_AGGREGATE ? (
                                        <a  title="Map chart">
                                            <MapIcon className="menu-icon" onClick={onViewMap} style={{fontSize:70, color:'#0082d6',marginLeft:"15px" }} />
                                            <div className='menu-title'>
                                                Map Chart
                                            </div>
                                        </a>

                                    ) : null}

                                </div>
                            </DialogContent>
                        </div>
                    </StyledDialog>




                </div>
            </div>
        );
    }

    render() {
        return (
            <Fragment>
                {this.renderInterpretationButton()}
                {this.renderVisualizationButtons()}
            </Fragment>
        );
    }
}

export default VisualizationItemHeaderButtons;
