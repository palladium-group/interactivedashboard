import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import {FormGroup, FormLabel as Label} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import uuid from "uuid/v4";
import {sGetAllCustomDashboards} from "../../../../reducers/dashboards";
import {getInstance} from "d2";
import i18n from "../../../ControlBar/Translation";
import {Redirect} from "react-router-dom";

const useStyles = (theme) => ({
    header: {
        textAlign: 'center',
        color:"#3a3a3a",
        height:'20px',
        fontSize:"18px",
        fontWeight:"500",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        paddingTop:"10px",
        paddingBottom:"20px"
    },
    error: {
        textAlign: 'center',
        color:"red",
        height:'14px',
        fontSize:"12px",
        fontWeight:"500",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
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
    },
    dialog:{
        width:"550px",
        height: "400px",
        paddingLeft:"10px",
        paddingRight:"10px"
    },
    dialogPaper: {
        minHeight: '410px',
        minWidth:"560px"
    },
});
class NewDashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
            dialog:true,
            error:false,
            errors:{},
            fields:{},
            disable:false
        }
    }
    handleClose=()=>{
        this.setState({
            dialog:false
        })
    }

    details=(event)=>{
        let fields = this.state.fields;
        fields[event.target.id] = event.target.value;
        this.setState({
            fields
        })
    }
    handleValidation=()=>{
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        //Name
        if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }
        if(typeof fields["name"] !== "undefined"){
            if(!fields["name"].match(/^[a-zA-Z0-9_ ]{4,150}$/)){
                formIsValid = false;
                errors["name"] = "Error on name input field";
            }
        }

        if(typeof fields["description"] !== "undefined"){
            if(!fields["description"].match(/^[a-zA-Z0-9_ ]{4,150}$/)){
                formIsValid = false;
                errors["description"] = "Description limited to length of 4-150 characters and only alpha numerics";
            }
        }
        this.setState({errors: errors});
        return formIsValid;
    }
    adminValidation=(username,password)=>{
        getInstance().then(d2 => {
            let api=d2.Api.getApi()
            api.get('dataStore/chart-studio/admin').then(result =>{
                if(result.username === this.state.fields.username && result.password === this.state.fields.password){
                    let dhisKey = this.props.studio;
                    let dashboards = dhisKey.dashboards
                    let newDashboard={
                        name:{en:this.state.fields.name},
                        id:uuid(),
                        created:Date().toLocaleString(),
                        dashboardItems:[]
                    }
                    dashboards.push(newDashboard)
                    let namespaceKey={
                        id:uuid(),
                        update:Date().toLocaleString(),
                        lastupdate:"create dashboard "+this.state.fields.name,
                        dashboards:dashboards
                    }
                    api.update('dataStore/chart-studio/dashboards',namespaceKey).then(result=>{
                        let fields = this.state.fields;
                        let errors = {};
                        errors["login"] = "You have successfully created a new dashboard";
                        this.setState({
                            errors: errors,
                            disable:true
                        });
                        setTimeout(function () {
                            if(result.httpStatus=="OK"){
                                window.location.reload(true);
                            }
                        }, 5000);

                    })

                }else{
                    let fields = this.state.fields;
                    let errors = {};
                    errors["login"] = "Error occurred during login to the DHIS2";
                    this.setState({errors: errors});
                    console.log(errors["login"])
                }

            }).catch(console.error);
        });


    }
    submitCreate=()=>{
        if (this.handleValidation()){
            this.adminValidation(this.state.fields.username, this.state.fields.password)
        }
    }
    render() {
        const { classes } = this.props;
        if(!this.props.isAdmin){
            return <Redirect to='/'/>
        }
        return (
            <Dialog onClose={this.handleClose} open={this.state.dialog} classes={{ paper: classes.dialogPaper }}>

                    <div className={classes.header}>{i18n.t('Create Dashboard')}</div>
                    <FormGroup row  >
                        <Label className={classes.label}>
                            {i18n.t('Dashboard Name')}
                        </Label>
                        <TextField
                            required
                            className={classes.textField}
                            id="name"
                            style={{ margin: 8 }}
                            placeholder="Dashboard Name*"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.details}

                        />
                        <span className={classes.error}>{this.state.errors["name"]}</span>
                    </FormGroup>
                    <FormGroup row  >
                        <Label className={classes.label}>
                            {i18n.t('Dashboard Description')}
                        </Label>
                        <TextField
                            className={classes.textField}
                            id="description"
                            style={{ margin: 8 }}
                            placeholder="Description"
                            multiline
                            variant="outlined"
                            onChange={this.details}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            rows={4}
                        />
                        <span className={classes.error}>{this.state.errors["description"]}</span>
                    </FormGroup>
                    <br/>
                    <FormGroup row  >
                        <Label className={classes.label}>
                            {i18n.t('Username')}
                        </Label>
                        <TextField
                            required
                            className={classes.textField}
                            id="username"
                            style={{ margin: 8 }}
                            placeholder="Username*"
                            onChange={this.details}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormGroup>
                    <FormGroup row  >
                        <Label className={classes.label}>
                            {i18n.t('Password')}
                        </Label>
                        <TextField
                            required
                            className={classes.textField}
                            id="password"
                            style={{ margin: 8 }}
                            placeholder="Password*"
                            onChange={this.details}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormGroup>
                    <br/>
                    <br/>
                        <div className={classes.error}>
                            <span className={classes.error}>{this.state.errors["login"]}</span>
                            <br/>
                            <br/>
                        </div>
                    <FormGroup row  >
                        <div style={{width:"50%"}}>
                            <Button
                                variant="contained"
                                style={{backgroundColor:"#36b9cc", color:"#fff", marginTop:"10px",marginLeft:"5%"}}
                                onClick={this.handleClose}
                            >
                                {i18n.t('Close')}
                            </Button>
                        </div>
                        <div style={{width:"50%"}}>
                            <Button
                                disabled={this.state.disable}
                                variant="contained"
                                style={{backgroundColor:"#1976d2", color:"#fff", marginTop:"10px", marginLeft:"50%"}}
                                onClick={this.submitCreate}
                            >
                                {i18n.t('Create')}
                            </Button>
                        </div>

                    </FormGroup>

            </Dialog>


        );
    }
}
const mapStateToProps=state=>{
    return{
        studio:sGetAllCustomDashboards(state),
    }
}

export default connect(mapStateToProps, null)(withStyles(useStyles)(NewDashboard));
