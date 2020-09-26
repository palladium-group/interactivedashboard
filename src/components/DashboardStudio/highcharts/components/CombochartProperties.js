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
        ['columns']: {
            name: "Columns",
            items: []
        },
        ['lines']: {
            name: "Line",
            items: []
        },
        ['category']: {
            name: "Category",
            items: []
        }
    }
};


const filterCategory=(filterItems =[]) => {
    return {
        ['filterlist']: {
            name: "Filter List",
            items: filterItems
        },
        ['filterselected']: {
            name: "Filter Items",
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


function CombochartProperties(props) {
    const classes = useStyles();
    let [columns, setColumns] = useState(columnsFromBackend);
    let [filters, setFilters] = useState(filterCategory)

    useEffect(() => {
        let dataColumns=props.dataColumns;
        let itemsFromBackend = dataColumns.map((header,key)=>{
            return { id: uuid(), content: header }
        })
        setColumns(columns=>({...columnsFromBackend(itemsFromBackend)}))
    },[props.dataColumns]);

    useEffect(()=>{
        props.setChartProperties({...columns, ...filters})
    },[columns])

    useEffect(()=>{
        props.setChartProperties({...columns, ...filters})
    },[filters])


    useEffect(()=>{
        if(columns.category.items.length>0){
            let category=columns.category.items[0]
            let filterDimensionItems=[...new Set(props.dataStore.map(item =>item[category.content]))]
            const categoryItems = [...new Set(filterDimensionItems.map(item => {
                return { id: uuid(), content: item }
            }))];
            setFilters(filters=>({...filterCategory(categoryItems)}))
            console.log(columns,"categoryItems",categoryItems)
        }

    },[columns.category.items])
    return (
        <div style={{ height: "100%" }}>
            <div style={{width: "100%"}}>
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
                                    <h2 className={classes.heading}>Line Series</h2>
                                    <div style={{ margin: 8 }}>
                                        <Droppable droppableId='lines' key='lines'>
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
                                                        {columns.lines.items.map((item, index) => {
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
                                    <h2 className={classes.heading}>Columns Series</h2>
                                    <div style={{ margin: 8 }}>
                                        <Droppable droppableId='columns' key='columns'>
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
                                                        {columns.columns.items.map((item, index) => {
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

            {columns.category.items.length>0?(
                <div style={{width: "100%"}}>
                    <DragDropContext
                        onDragEnd={result => onDragEnd(result, filters, setFilters)}
                    >
                        <Grid container style={{width:'100%'}}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={6} md={6} lg={6} >
                                    <h2 className={classes.heading}>Category Filter List</h2>
                                    <div style={{ margin: 8 }}>
                                        <Droppable droppableId='filterlist' key='filterlist'>
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
                                                        {filters.filterlist.items.map((item, index) => {
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
                                    <h2 className={classes.heading}>Selected Category Filters</h2>
                                    <div style={{ margin: 8 }}>
                                        <Droppable droppableId='filterselected' key='filterselected'>
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
                                                        {filters.filterselected.items.map((item, index) => {
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

                    </DragDropContext>
                </div>
            ):null}




        </div>
    );
}

export default CombochartProperties;
