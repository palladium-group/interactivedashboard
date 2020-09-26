import React,{Component} from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './feedbackForm.css'
import Button from '@material-ui/core/Button';
import i18n from '../ControlBar/Translation'
import {languageDir} from "../../modules/languageDir";
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import moment from 'moment';
import {getInstance} from "d2";
import NativeSelect from "@material-ui/core/NativeSelect";
const useStyles = theme => ({
    title:{
        fontWeight:"bolder",
        color:"#2c6693",
        textTransform:"uppercase",
        fontSize:"32px"
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
    success: {
        textAlign: 'center',
        color:"blue",
        height:'26px',
        fontSize:"24px",
        fontWeight:"500",
        fontFamily:"Poppins,Roboto,Helvetica Neue,Arial,sans-serif",
        width:"100%"
    },
});

class FeedbackForm extends Component{
    constructor(props) {
        super(props);
        this.state={
            events:{},
            fields:{},
            errors:{},
            disable:false
        }
    }
    componentDidMount() {
        fetch('/config/dhisevents.json').then(response=>response.json()).then(results=>{
            this.setState({
                events:results.events
            })
        })
    }

    formSubmit=()=>{
        if(this.handleValidation()){
            this.saveForm()
        }
    }
    handleValidation=()=>{
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        //Name
        if(!fields["names"]){
            formIsValid = false;
            errors["names"] = "Name Field cannot be empty";
        }
        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Email Field cannot be empty";
        }

        if(!fields["country"]){
            formIsValid = false;
            errors["country"] = "Country Field cannot be empty";
        }
        if(!fields["feedback"]){
            formIsValid = false;
            errors["feedback"] = "Feedback field cannot be empty";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    formUpdate=(event)=>{
        let fields = this.state.fields;
        fields[event.target.id] = event.target.value;
        this.setState({
            fields
        })
    }
    saveForm=()=>{

        let feedbackevent=this.state.events.feedbackevent;
        var currentdate = moment(new Date()).format('YYYY-MM-DD');
        var eventJson = {
            program: feedbackevent.programId,
            orgUnit: feedbackevent.programPostOrgunitId,
            eventDate: currentdate,
            status: 'COMPLETED',
            completedDate: currentdate,
            dataValues: [
                {
                    //Full Names
                    dataElement: feedbackevent.names.dhis2Uid,
                    value: this.state.fields.names,
                },
                {
                    //Email
                    dataElement: feedbackevent.email.dhis2Uid,
                    value: this.state.fields.email
                },
                {
                    //Country
                    dataElement: feedbackevent.country.dhis2Uid,
                    value: this.state.fields.country
                },
                {
                    //State
                    dataElement: feedbackevent.state.dhis2Uid,
                    value: this.state.fields.state
                },
                {
                    //Feedback
                    dataElement: feedbackevent.feedback.dhis2Uid,
                    value: this.state.fields.feedback
                },
            ],
        };
        getInstance().then(d2 => {
                d2.Api.getApi().post('events',eventJson).then(response=>{
                    let errors = {};
                    errors["success"] = "Thank you for your feedback";
                    this.setState({
                        errors: errors,
                        disable:true
                    });
                    let closeDialog=this.props.onClose
                    setTimeout(function () {
                        if(response.httpStatus=="OK"){
                            closeDialog()
                        }
                    }, 5000);
                }).catch(error=>{
                    let errors = {};
                    errors["submit"] = "An error has occurred when submiting the form kindly try again";
                    this.setState({errors: errors});
                })
        });
    }

    render() {
        const { classes } = this.props;
        const dir=languageDir[localStorage.getItem('lang')]!=undefined?languageDir[localStorage.getItem('lang')]:'ltr';
        return(
            <React.Fragment>
                <div className='feedback-holder' dir={dir}>
                    <Typography  gutterBottom align="center" className={classes.title} >
                         {i18n.t('Feedback and suggestions')}
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="names"
                                name="names"
                                label={i18n.t('Names')}
                                onChange={this.formUpdate}
                                fullWidth
                                autoComplete={i18n.t('Given Names')}
                            />
                            <span className={classes.error}>{this.state.errors["names"]}</span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                onChange={this.formUpdate}
                                label={i18n.t('Email')}
                                fullWidth
                                autoComplete={i18n.t('Email')}
                            />
                                <span className={classes.error}>{this.state.errors["email"]}</span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="country"
                                name="country"
                                onChange={this.formUpdate}
                                label={i18n.t('Country')}
                                fullWidth

                                autoComplete={i18n.t('Country')}
                            />
                                <span className={classes.error}>{this.state.errors["country"]}</span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="state" name="state" label={i18n.t('State/Province/Region')} fullWidth  onChange={this.formUpdate}/>

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="feedback"
                                name="Feedback and Suggestion"
                                label={i18n.t('Feedback and suggestions')}
                                onChange={this.formUpdate}
                                fullWidth
                                multiline
                                rows={4}
                                autoComplete={i18n.t('Feedback and suggestions')}
                            />
                                <span className={classes.error}>{this.state.errors["feedback"]}</span>
                        </Grid>
                        <span className={classes.error}>{this.state.errors["submit"]}</span>
                        <span className={classes.success}>{this.state.errors["success"]}</span>
                        <Grid item xs={12} sm={12}>
                            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: '#2c6693',color:"#fff", marginTop:"10px" }}
                                    onClick={()=>this.formSubmit()}
                                    disabled={this.state.disable}
                                >
                                    {i18n.t("Submit")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </div>

            </React.Fragment>
        );
    }

}
const mapStateToProps=state=>{
    return{
        dhisevent:state.eventsConfig
    }
}

export default connect(mapStateToProps, null)(withStyles(useStyles)(FeedbackForm));

