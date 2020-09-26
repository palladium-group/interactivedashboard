import React,{Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import {getInstance} from "d2";
import {FormGroup, FormLabel as Label} from "@material-ui/core";
import i18n from "../ControlBar/Translation";
import TextField from "@material-ui/core/TextField";
import DialogTitle from '@material-ui/core/DialogTitle';
import {Redirect} from 'react-router-dom'

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
class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state={
            errors:{},
            fields:{},
            disable:false,
            close:false
        }
    }
    login=()=>{
        getInstance().then(d2 => {
            let api=d2.Api.getApi()
            api.get('dataStore/chart-studio/admin').then(result =>{
                if(result.username === this.state.fields.username && result.password === this.state.fields.password){
                    this.props.isAdmin();
                    this.setState({
                        close:true
                    })
                }else{
                    let fields = this.state.fields;
                    let errors = {};
                    errors["login"] = "Incorrect username or password";
                    this.setState({errors: errors});
                }

            }).catch(console.error);
        });
    }
    handleClose=()=>{
        this.setState({
            close:true
        })
    }
    details=(event)=>{
        let fields = this.state.fields;
        fields[event.target.id] = event.target.value;
        this.setState({
            fields
        })
    }
    render() {
        const { classes } = this.props;
        if(this.state.close){
            return <Redirect to='/'/>
        }
        return(
            <React.Fragment>
                <Dialog
                    maxWidth='md'
                    open={true}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle style={{textAlign:"center"}}>{i18n.t('Admin Login')}</DialogTitle>
                    <DialogContent>
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
                                    onClick={this.login}
                                >
                                    {i18n.t('Login')}
                                </Button>
                            </div>

                        </FormGroup>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }
}
export default withStyles(useStyles)(AdminLogin);
