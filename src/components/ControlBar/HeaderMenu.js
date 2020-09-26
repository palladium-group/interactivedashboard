import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import i18n from './Translation'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import LanguageIcon from '@material-ui/icons/Language';
import {acReceivedUser} from "../../actions/user";
import {tFetchDashboards} from "../../actions/dashboards";
import {tSetControlBarRows} from "../../actions/controlBar";
import {tSetDimensions} from "../../actions/dimensions";
import {connect} from "react-redux";
import FeedbackIcon from '@material-ui/icons/Feedback';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from '@material-ui/core/DialogContent';
import DatarequestForm from "../Forms/DatarequestForm";
import FeedbackForm from "../Forms/FeedbackForm";
import {languageDir} from "../../modules/languageDir";
import {sGetAllCustomDashboards} from "../../reducers/dashboards";
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 250;
const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: transparent;
  }
  .MuiDialogContent-dividers {
padding: 16px 24px;
border: 1px solid rgba(0, 0, 0, 0.12);
background-color: #fff;
}
`;
const DialogContent = MuiDialogContent;
const useStyles = theme => ({
    headerbar:{
        backgroundColor:"#2c6693",
        height:"80px",
    },
    button: {
        padding: "5px",
        height: '50%',
        marginTop:'20px',
        color:'white',
        "&:hover, &:focus": {
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor:'#fff',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize:'0.7vw'
        },
    },
    icon:{
      padding:"5px",
        fontSize:'0.9vw'
    },
    menu:{
        marginTop:'40px'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor:"#2c6693",
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});




export class HeaderMenu extends Component{
    constructor() {
        super();
        this.state={
            dashboards:[],
            anchorEl:null,
            feedbackStatus:false,
            datarequest:false,
            chartstudioMenu:false,
            languageMenu:false,
            drawerOpen:false
        }
    }

    handleClick = (event) => {
        this.setState({
            anchorEl:event.currentTarget,
            [event.currentTarget.value]:true
        })

    };

    handleClose = () => {
        this.setState({
            anchorEl:null,
            feedbackStatus:false,
            datarequest:false,
            chartstudioMenu:false,
            languageMenu:false

        })
    };
   navigate=(nav) => {
        window.location.href = nav;
    }
    feedbackForm=()=>{
        this.setState({
            feedbackStatus:true
        })
    }
    datarequestForm=()=>{
        this.setState({
            datarequest:true
        })
    }

    chartstudioMenuItems= ()=>{
        let customDashboards= this.props.customDashboards.dashboards!=undefined?this.props.customDashboards.dashboards:[];
        return customDashboards.map(dashboard=>{
            return(<MenuItem key={dashboard.id} onClick={()=>{this.navigate(`/#/chartstudio/${dashboard.id}`)}}>{dashboard.name.en}</MenuItem>)
        })
    }

    languageSwitcher=(lang)=>{
        localStorage.setItem('lang', lang);
        window.location.reload(true);
    }

    menuItems=()=>{
        const { classes } = this.props;
       return(
           <React.Fragment>
               <div  style={{color:"white", height:"80px"}}>
                   <Button
                       aria-controls="simple-menu"
                       aria-haspopup="true"
                       onClick={()=>{this.navigate('/#/')}}
                       startIcon={<HomeIcon className={classes.icon} />}
                       className={classes.button}
                   >
                       {i18n.t('Home')}
                   </Button>

                   <Button
                       aria-controls="simple-menu"
                       aria-haspopup="true"
                       onClick={()=>{this.navigate('/#/')}}
                       startIcon={<LineStyleIcon  className={classes.icon}  />}
                       className={classes.button}
                   >
                       {i18n.t('DHIS2 Dashboards')}
                   </Button>

                   <Button
                       aria-controls="simple-menu"
                       aria-haspopup="true"
                       //onClick={()=>{this.navigate('/#/d3studio')}}
                       onClick={this.handleClick}
                       startIcon={<DashboardIcon  className={classes.icon}  />}
                       className={classes.button}
                       value="chartstudioMenu"
                   >
                       {i18n.t('Custom dashboards')}
                   </Button>
                   <Menu
                       id="dropdown-menu"
                       anchorEl={this.state.anchorEl}
                       keepMounted
                       open={this.state.chartstudioMenu}
                       onClose={this.handleClose}
                       elevation={0}
                       getContentAnchorEl={null}
                       anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'center',
                       }}
                       transformOrigin={{
                           vertical: 'top',
                           horizontal: 'center',
                       }}
                   >
                       {this.chartstudioMenuItems()}
                   </Menu>


                   <Button
                       aria-controls="simple-menu"
                       aria-haspopup="true"
                       onClick={this.datarequestForm}
                       startIcon={<DataUsageIcon  className={classes.icon}  />}
                       className={classes.button}
                   >
                       {i18n.t('Data Request')}
                   </Button>
                   <StyledDialog
                       onClose={this.handleClose}
                       aria-labelledby="customized-dialog-title"
                       open={this.state.datarequest}
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
                       modal={'true'}
                   >
                       <DialogContent dividers>
                           <DatarequestForm onClose={this.handleClose} />
                       </DialogContent>
                   </StyledDialog>


                   <Button
                       aria-controls="simple-menu"
                       aria-haspopup="true"
                       onClick={()=>{this.navigate('/#/resources')}}
                       startIcon={<FileCopyIcon  className={classes.icon}  />}
                       className={classes.button}
                   >
                       {i18n.t('Resources')}
                   </Button>

                   <Button
                       aria-controls="simple-menu"
                       aria-haspopup="true"
                       onClick={this.feedbackForm}
                       startIcon={<FeedbackIcon  className={classes.icon}  />}
                       className={classes.button}
                   >
                       {i18n.t('Feedback and suggestions')}
                   </Button>

                   <StyledDialog
                       onClose={this.handleClose}
                       aria-labelledby="customized-dialog-title"
                       open={this.state.feedbackStatus}
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
                       modal={'true'}
                   >
                       <DialogContent dividers>
                           <FeedbackForm onClose={this.handleClose} />
                       </DialogContent>
                   </StyledDialog>

                   <Button
                       aria-controls="simple-menu"
                       aria-haspopup="true"
                       onClick={this.handleClick}
                       startIcon={<LanguageIcon  className={classes.icon}  />}
                       className={classes.button}
                       value="languageMenu"
                   >
                       {i18n.t('Language')}
                   </Button>
                   <Menu
                       id="dropdown-menu"
                       anchorEl={this.state.anchorEl}
                       keepMounted
                       open={this.state.languageMenu}
                       onClose={this.handleClose}
                       elevation={0}
                       getContentAnchorEl={null}
                       anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'center',
                       }}
                       transformOrigin={{
                           vertical: 'top',
                           horizontal: 'center',
                       }}
                   >
                       <MenuItem onClick={()=>this.languageSwitcher('en')}>{i18n.t('English')}</MenuItem>
                       <MenuItem onClick={()=>this.languageSwitcher('dr')}>{i18n.t('Dari')}</MenuItem>
                       <MenuItem onClick={()=>this.languageSwitcher('pa')}>{i18n.t('Pashto')}</MenuItem>
                   </Menu>
               </div>


           </React.Fragment>
       )
    }
    handleDrawerOpen = () => {
        this.setState({
            drawerOpen:true
        })
    };

    handleDrawerClose = () => {
        this.setState({
            drawerOpen:false
        })
    };
    render() {
        const { classes } = this.props;
        const dir=languageDir[localStorage.getItem('lang')]!=undefined?languageDir[localStorage.getItem('lang')]:'ltr';
        return(
            <div>
                <div className={classes.headerbar} dir={dir}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Grid container  spacing={0}>
                                <Hidden smDown>
                                    <Grid key={1} item xs={2}>
                                        <a href="/"><img src='/img/moph-Afghanistan.png' height="60px" style={{marginTop:"10px"}}/></a>
                                    </Grid>
                                </Hidden>

                                <Grid key={2} item xs={8}>
                                    <Hidden smUp>
                                        <Toolbar style={{marginTop:"20px"}}>
                                            <IconButton
                                                color="inherit"
                                                aria-label="open drawer"
                                                onClick={()=>this.handleDrawerOpen()}
                                                edge="start"
                                            >
                                                <MenuIcon style={{fontSize:"30px",color:"#fff"}}/>
                                            </IconButton>
                                            <Typography variant="h6" noWrap style={{color:"#fff"}}>
                                                {i18n.t('Menu Items')}
                                            </Typography>
                                        </Toolbar>

                                        <Drawer
                                            className={classes.drawer}
                                            variant="persistent"
                                            anchor="left"
                                            open={this.state.drawerOpen}
                                            classes={{
                                                paper: classes.drawerPaper,
                                            }}
                                            style={{fontSize:"16px"}}
                                        >
                                            <div className={classes.drawerHeader}>
                                                <IconButton onClick={()=>this.handleDrawerClose()}>
                                                    <ChevronLeftIcon style={{fontSize:"30px",color:"#fff"}} />
                                                </IconButton>
                                            </div>
                                            <Divider />
                                            {this.menuItems()}
                                        </Drawer>
                                    </Hidden>

                                    <Hidden smDown>
                                        <div style={{fontSize:"0.5vw"}}>
                                            {this.menuItems()}
                                        </div>

                                    </Hidden>
                                </Grid>
                                <Grid key={3} item xs={2}>
                                    <a href="/"><img src='/img/moph-Afghanistan.png' height="60px" style={{marginTop:"10px"}}/></a>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </div>

            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        customDashboards:sGetAllCustomDashboards(state),
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: currentUser => dispatch(acReceivedUser(currentUser)),
        fetchDashboards: () => dispatch(tFetchDashboards()),
        setControlBarRows: () => dispatch(tSetControlBarRows()),
        setDimensions: d2 => dispatch(tSetDimensions(d2)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(HeaderMenu));
