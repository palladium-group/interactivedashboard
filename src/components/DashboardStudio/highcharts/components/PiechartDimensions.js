import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {FormGroup, FormLabel as Label} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    },
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

    },
    label:{
        width:"40%",
        color:"#3a3a3a",
        textAlign:"left",
        paddingTop:'20px',
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        fontSize:"14px",
        fontWeight:"500",
        marginLeft:"5px",
        textOverflow:'ellipsis'
    },
    formControl:{
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        fontSize:"14px",
        paddingLeft:"2%",
        paddingTop:"5px",
    }
}));

let chartDimension={
    width:400,
    height:400,
    legendPosition:"Bottom Center"
}


export default function PiechartDimensions(props){
    const classes = useStyles();
    const [dimension, setDimension]=useState(chartDimension)
    const dimensionUpddate=(event)=>{
        chartDimension[event.target.id]=event.target.value;
        props.setChartDimensions(chartDimension)
    }
    return(
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    required
                    id="width"
                    label="Width"
                    variant="outlined"
                    type="number"
                    style = {{width: '47%',marginRight:"10px"}}
                    onChange={dimensionUpddate}
                    defaultValue={400}
                />
                <TextField
                    required
                    id="height"
                    label="Height"
                    variant="outlined"
                    type="number"
                    style = {{width: '47%'}}
                    onChange={dimensionUpddate}
                    defaultValue={400}
                />
            </form>
        </div>
    )
}
