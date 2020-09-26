import React,{Component} from "react";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import { FormLabel as Label, FormGroup , Input } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

import Button from '@material-ui/core/Button';
import {chartDataFetchHelperCsv,csvtojson} from "../../../helpers/apihelpers";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import i18n from '../../ControlBar/Translation'

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
    error: {
        textAlign: 'center',
        color:"red",
        height:'14px',
        fontSize:"12px",
        fontWeight:"500",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        width:"100%"
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
        fontWeight:"500",
        textOverflow:'ellipsis'
    },
    formControl:{
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        fontSize:"14px",
        paddingLeft:"2%",
        paddingTop:"5px",
    }
});

class SourcePanel extends Component{
    constructor(props) {
        super(props);
        this.state={
            dataApi:"",
            fields:{
                sourcesystem:"",
                dataapi:"",
                systemgroup:"",
                connectionstring:"{}"
            },
            systemName:"",
            systemGroup:"",
            errors:{}
        }
    }
    IsJsonString=(str)=> {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    handleValidation=()=>{
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        //Name
        if(!fields["sourcesystem"]){
            formIsValid = false;
            errors["sourcesystem"] = "Source System cannot be empty";
        }
        if(typeof fields["sourcesystem"] !== "undefined"){
            if(!fields["sourcesystem"].match(/^[a-zA-Z0-9_ ]{4,150}$/)){
                formIsValid = false;
                errors["sourcesystem"] = "Error on name input field";
            }
        }
        if(!fields["dataapi"]){
            formIsValid = false;
            errors["dataapi"] = "Api field cannot be empty";
        }
        if(fields["systemgroup"] !='local'){
            if(typeof fields["connectionstring"] !== "undefined" ){
                if(this.IsJsonString(fields["connectionstring"])==false){
                    formIsValid = false;
                    errors["connectionstring"] = "Error on Connection String";
                }
            }
        }

        if(!fields["systemgroup"]){
            formIsValid = false;
            errors["systemgroup"] = "Select a valid system group";
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    formSubmit=()=>{
        if(this.handleValidation()){
            this.fetchData()
        }
    }

    fetchData=()=>{
        chartDataFetchHelperCsv(this.state.fields.dataapi,this.state.fields.systemgroup,JSON.parse(this.state.fields.connectionstring))
            .then(result => {
                if(result.message=="success"){
                    let dataStore=csvtojson(result.data)
                    this.props.datasourceConfig({
                        connectioninfo:{
                            dataApi:this.state.fields.dataapi,
                            systemName:this.state.fields.sourcesystem,
                            systemGroup:this.state.fields.systemgroup,
                            connectionstring:JSON.parse(this.state.fields.connectionstring)
                        },
                        dataApi:this.state.fields.dataapi,
                        systemName:this.state.fields.sourcesystem,
                        systemGroup:this.state.fields.systemgroup,
                        connectionstring:JSON.parse(this.state.fields.connectionstring),
                        dataStore:dataStore.data,
                        dataColumns: dataStore.headers,
                        showDimensions:true
                    })

                }else{
                    let fields = this.state.fields;
                    let errors = {};
                    let formIsValid = true;
                    errors["datafetch"] = result.message;
                    this.setState({errors: errors});
                    return formIsValid;
                }

            })
    }
    formUpdate=(event)=>{
        let fields = this.state.fields;
        fields[event.target.id] = event.target.value;
        this.setState({
            fields
        })
    }

    render() {
        const { classes } = this.props;
        return(
            <React.Fragment>
                <div>
                    <FormGroup required row  >
                        <Label className={classes.label}>
                            {i18n.t('System Group')}
                        </Label>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                id="systemgroup"
                                value={this.state.fields.systemgroup}
                                onChange={this.formUpdate}
                                className={classes.formControl}
                            >
                                <option value='dhis'>DHIS2</option>
                                <option value='mfl'>MFL</option>
                                <option value='other'>Other</option>
                                <option value='local'>No Auth</option>
                            </NativeSelect>
                            <span className={classes.error}>{this.state.errors["systemgroup"]}</span>
                        </FormControl>

                    </FormGroup>
                        <FormGroup row  >
                            <Label className={classes.label}>
                                {i18n.t('System Name')}
                            </Label>
                            <TextField
                                className={classes.textField}
                                id="sourcesystem"
                                style={{ margin: 8 }}
                                placeholder="Data Source System"
                                onChange={this.formUpdate}
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />
                            <span className={classes.error}>{this.state.errors["sourcesystem"]}</span>
                        </FormGroup>
                    <FormGroup required row  >
                        <Label className={classes.label}>
                            {i18n.t('Data Api')}
                        </Label>
                        <TextField
                            className={classes.textField}
                            id="dataapi"
                            style={{ margin: 8 }}
                            placeholder={i18n.t('Data Api')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.formUpdate}
                        />
                        <span className={classes.error}>{this.state.errors["dataapi"]}</span>
                    </FormGroup>
                    {this.state.fields.systemgroup!='local'?
                        <FormGroup required row  >
                            <Label className={classes.label}>
                                 {i18n.t('Connection String')}
                            </Label>
                            <TextField
                                className={classes.textField}
                                id="connectionstring"
                                style={{ margin: 8 }}
                                placeholder={i18n.t('Connection String')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                multiline
                                rows={4}
                                rowsMax={10}
                                onChange={this.formUpdate}
                            />
                            <span className={classes.error}>{this.state.errors["connectionstring"]}</span>
                        </FormGroup>
                        :null}


                    <Grid container xs={12} sm={12} md={12} lg={12} >
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <span className={classes.error}>{this.state.errors["datafetch"]}</span>
                        </Grid>
                        <Grid item xs={6} sm={8} md={8} lg={8} >
                        </Grid>
                        <Grid item xs={6} sm={4} md={4} lg={4} >
                            <Button variant="contained" style={{backgroundColor:"#1976d2", color:"#fff", marginBottom:"5px"}} onClick={this.formSubmit}>
                                {i18n.t('Fetch Data')}
                            </Button>
                        </Grid>
                    </Grid>

                </div>


            </React.Fragment>
        )
    }
}
export default withStyles(useStyles)( SourcePanel)
