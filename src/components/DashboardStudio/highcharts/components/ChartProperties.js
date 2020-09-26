import React, {useEffect, useState} from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: 'center',
        color:"#3a3a3a",
        fontSize:"18px",
        fontWeight:"500",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
    },
    item:{
        textAlign: 'left',
        fontSize:"12px",
        userSelect: "none",
        padding: 5,
        margin: "0 0 8px 0",
        minHeight: "20px",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        fontWeight:"bolder",

    }
}));

const columnsFromBackend=(itemsFromBackend =[]) => {
    return {
        ['dataColumns']: {
            name: "Table Columns",
            items: itemsFromBackend
        },
        ['series']: {
            name: "Series",
            items: []
        },
        ['category']: {
            name: "Category",
            items: []
        }
    }
};

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

function ChartProperties(props) {
    const classes = useStyles();
    let [columns, setColumns] = useState(columnsFromBackend);

    useEffect(() => {
        let dataColumns=props.dataColumns;
        let itemsFromBackend = dataColumns.map((header,key)=>{
            return { id: uuid(), content: header }
        })
        setColumns(columns=>({...columnsFromBackend(itemsFromBackend)}))
    },[props.dataColumns]);

    useEffect(()=>{
        console.log("Collll",columns)
        props.setChartProperties(columns)
    },[columns])

    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>


            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                <Grid container style={{width:'100%'}}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={6} md={6} lg={6} >
                            <h2 className={classes.heading}>Data Columns</h2>
                            <div style={{ margin: 8 }}>
                                <Droppable droppableId='dataColumns' key='dataColumns'>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background:"#fff",
                                                    padding: 0,
                                                    width: "100%",
                                                    minHeight: 400,
                                                    border:"1px Solid #ddd"

                                                }}
                                            >
                                                {columns.dataColumns.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={classes.item}
                                                                        style={{
                                                                            backgroundColor: snapshot.isDragging
                                                                                ? "#263B4A"
                                                                                : "#456C86",
                                                                            color: "white",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        {item.content}
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} >
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <h2 className={classes.heading}>Series</h2>
                                <div style={{ margin: 8 }}>
                                    <Droppable droppableId='series' key='series'>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background:"#fff",
                                                        padding: 4,
                                                        width: "100%",
                                                        minHeight: 150,
                                                        border:"1px Solid #ddd"
                                                    }}
                                                >
                                                    {columns.series.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className={classes.item}
                                                                            style={{
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? "#263B4A"
                                                                                    : "#456C86",
                                                                                color: "white",
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {item.content}
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <h2 className={classes.heading}>Category</h2>
                                <div style={{ margin: 8 }}>
                                    <Droppable droppableId='category' key='category'>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background:"#fff",
                                                        padding: 4,
                                                        width: "100%",
                                                        minHeight: 150,
                                                        border:"1px Solid #ddd"
                                                    }}
                                                >
                                                    {columns.category.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className={classes.item}
                                                                            style={{
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? "#263B4A"
                                                                                    : "#456C86",
                                                                                color: "white",
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {item.content}
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </DragDropContext>
        </div>
    );
}

export default ChartProperties;
