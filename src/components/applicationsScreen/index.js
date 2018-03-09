import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";
import TextField from "material-ui/TextField";
import {
  Android,
  Delete,
  ModeEdit,
  AccessTime,
  Web,
  PhoneIphone,
  Warning
} from "material-ui-icons";
import Switch from "material-ui/Switch";
import Checkbox from "material-ui/Checkbox";
import Grid from "material-ui/Grid";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Dialog, { DialogTitle, DialogContent } from "material-ui/Dialog";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import { SnackbarContent } from "material-ui/Snackbar";
import message from "../../utils/message";
import styles from "./styles";
import {
  applicationRequest,
  openDeleteModal,
  closeDeleteModal,
  openAddModal,
  deleteApplicationRequest,
  applicationDetailRequest,
  closeAddModal,
  enableOrDisable,
  createApplicationRequest,
  setCreateAppText
} from "./actions";
import formatDate from "../../utils/formatDate";

const ApplicationItem = ({ classes, application }) => {
  return (
    <Grid container className={classes.applictntitle}>
      <Grid item xs={4}>
        <Checkbox color="primary" />
        <Typography variant="subheading" className={classes.inline} noWrap>
          {application.name}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subheading" className={classes.inline} noWrap>
          {application.androidCode}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subheading" className={classes.inline} noWrap>
          {application.iosCode}
        </Typography>
      </Grid>
    </Grid>
  );
};

ApplicationItem.propTypes = {
  application: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const AddModal = ({
  isOpened,
  classes,
  isClose,
  createApplication,
  setCreateAppText,
  ApplicationName,
  applicationAndroidCode,
  applicationIOSCode
}) => {
  let view = (
    <div>
      <Typography variant="body2" className={classes.dialogText}>
        {
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis tellus eleifend, interdum lectus ut."
        }
      </Typography>
      <div>
        <TextField
          helperText="Name"
          fullWidth={true}
          onChange={text =>
            setCreateAppText(
              text.target.value,
              applicationAndroidCode,
              applicationIOSCode
            )
          }
        />
      </div>
      <div>
        <TextField
          helperText="android code"
          fullWidth={true}
          onChange={text =>
            setCreateAppText(
              ApplicationName,
              text.target.value,
              applicationIOSCode
            )
          }
        />
      </div>
      <div>
        <TextField
          helperText="ios code"
          fullWidth={true}
          onChange={text =>
            setCreateAppText(
              ApplicationName,
              applicationAndroidCode,
              text.target.value
            )
          }
        />
      </div>
      <div className={classes.cardiTem}>
        <Button
          variant="raised"
          color="primary"
          onClick={() => {
            isClose();
          }}
        >
          {message("CANCELAR")}
        </Button>

        <Button
          variant="raised"
          color="primary"
          onClick={() => {
            if (ApplicationName !== "" && applicationAndroidCode !== "" && applicationIOSCode !== "") {            
              console.log(
                ApplicationName,
                applicationAndroidCode,
                applicationIOSCode
              );           
              createApplication(1, ApplicationName,applicationAndroidCode,applicationIOSCode);
            }
            else{
              console.log('came');
             
            }
          }}
        >
          {message("CREAR APLICACIóN")}
        </Button>
      </div>
    </div>
  );
  return (
    <Dialog open={isOpened}>
      <DialogTitle> {message("Enlazar nueva aplicación")}</DialogTitle>
      <DialogContent className={classes.modalContent}>{view}</DialogContent>
    </Dialog>
  );
};

class applicationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      chkAddPopup: false,
      data : this.props.applicationList
    };
  }

  componentWillMount() {
    this.props.initialize(1);
  }

  componentWillReceiveProps(newProps) {
   // console.log('newProps',JSON.stringify(newProps));
   if (this.props.applicationList.length != newProps.applicationList.length){
     let data = newProps.applicationList.map(item => item.id);
     data.map((item,i)=>{
      if( newProps.applicationList.length > i){
        newProps.applicationDetail(item);
      }     
    });
   }
  }

  render() {

    

    let view;
    if (this.props.isRequesting === true) {
      view = (
        <div className={this.props.classes.progress}>
          <CircularProgress />
        </div>
      );
    } else {
      view = (
        <div>
          <Grid container className={this.props.classes.appheader}>
            <Grid item xs={4}>
              <Checkbox color="primary" />

              <Typography variant="title" className={this.props.classes.inline}>
                {message("Nombre")}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography noWrap variant="title">
                {message("Paquete")}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography noWrap variant="title">
                {message("URL Scheme")}
              </Typography>
            </Grid>
          </Grid>

          <Grid className={this.props.classes.cardiTem}>
          {console.log('applicationDetailList:'  , this.props.applicationDetailList)}
            {this.props.applicationDetailList.map((item, index) => {
                return (
                  <div key={index}>
                    <ApplicationItem
                      classes={this.props.classes}
                      application={item}
                    />
                    <br />
                  </div>
                );            
            })}
          </Grid>
        </div>
      );
    }

    return (
      <div>
        <Grid container>
          <Grid item xs={6}>
            <Typography noWrap variant="headline">
              {message("Aplicaciones externas conectadas")}
            </Typography>
          </Grid>
          <Grid item xs={6} className={this.props.classes.headButton}>
            <Link to={"/applications/new"}>
              <Button
                variant="raised"
                color="primary"
                onClick={() => {
                  this.props.CheckAddModal();
                }}
              >
                {message("Nueva campaña")}
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={8} md={9}>
                    <Typography noWrap variant="subheading">
                      {" "}
                      {message("Listado de aplicaciones")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3}>
                    <Typography noWrap variant="subheading">
                      {" "}
                      {this.props.applicationDetailList.length}{" "}
                      {message("aplicaciones")}
                    </Typography>
                  </Grid>
                  <Divider />

                  <Grid
                    item
                    xs={12}
                    sm={2}
                    md={1}
                    className={this.props.classes.headButton}
                  >
                    <Link to={"/applications/new"}>
                      <Button
                        variant="raised"
                        color="primary"
                        onClick={() => {}}
                      >
                        {message("EDITAR")}
                      </Button>
                    </Link>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={2}
                    className={this.props.classes.headButton}
                  >
                    <Link to={"/applications"}>
                      <Button
                        variant="raised"
                        color="primary"
                        onClick={() => {
                          //this.props.deleteHandler(1)
                        }}
                      >
                        {message("ELIMINAR")}
                      </Button>
                    </Link>
                  </Grid>
                  <Divider />
                  <Grid item xs={12} sm={3} md={2} />

                  <Grid item xs={12}>
                    {view}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <AddModal
          classes={this.props.classes}
          isOpened={this.props.isAddModalOpened}
          isClose={this.props.closeAddModal}
          createApplication={this.props.createApplication}
          ApplicationName={this.props.ApplicationName}
          applicationAndroidCode={this.props.applicationAndroidCode}
          applicationIOSCode={this.props.applicationIOSCode}
          setCreateAppText={this.props.setCreateAppText}
        />
      </div>
    );
  }
}

applicationsScreen.propTypes = {
  isRequesting: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  applicationList: PropTypes.array.isRequired,
  initialize: PropTypes.func.isRequired,
  createApplication: PropTypes.func.isRequired,
  modalDeleteHandler: PropTypes.func.isRequired,
  CheckAddModal: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
  applicationDetail: PropTypes.func.isRequired,
  applicationDetailList: PropTypes.array.isRequired,
  isDeleteModalOpened: PropTypes.bool.isRequired,
  isAddModalOpened: PropTypes.bool.isRequired,
  deleteModalClose: PropTypes.func.isRequired,
  selectedApplication: PropTypes.object.isRequired,
  isDeletingApplication: PropTypes.bool.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  isDeletedError: PropTypes.bool.isRequired,
  enableOrDisableHandler: PropTypes.func.isRequired,
  setCreateAppText: PropTypes.func.isRequired,
  ApplicationName: PropTypes.string.isRequired,
  applicationAndroidCode: PropTypes.string.isRequired,
  applicationIOSCode: PropTypes.string.isRequired
};

const mapStateToProps = state => {
console.log(state);
  return {
    applicationList: state.applicationList.get("applicationList"),
    applicationDetailList: state.applicationList.get("applicationDetail"),
    // createApplication: state.applicationList.get("createApplication"),
    isRequesting: state.applicationList.get("requesting"),
    isDeleteModalOpened: state.applicationList.get("isDeleteModalOpened"),
    isAddModalOpened: state.applicationList.get("isAddModalOpened"),
    selectedApplication: state.applicationList.get("selectedApplication"),
    isDeletingApplication: state.applicationList.get("isDeletingApplication"),
    isDeleted: state.applicationList.get("deletionOk"),
    isDeletedError: state.applicationList.get("deletionError"),
    ApplicationName: state.applicationList.get("ApplicationName"),
    applicationAndroidCode: state.applicationList.get("applicationAndroidCode"),
    applicationIOSCode: state.applicationList.get("applicationIOSCode")
  };
};

const mapDispatchToProps = dispatch => ({
  initialize: appId => dispatch(applicationRequest(appId)),
  modalDeleteHandler: application => dispatch(openDeleteModal(application)),
  deleteModalClose: () => dispatch(closeDeleteModal()),
  CheckAddModal: () => dispatch(openAddModal()),
  closeAddModal: () => dispatch(closeAddModal()),
  deleteHandler: id => dispatch(deleteApplicationRequest(id)),
  applicationDetail: id => dispatch(applicationDetailRequest(id)),
  setCreateAppText: (name, androidCode, iosCode) =>
    dispatch(setCreateAppText(name, androidCode, iosCode)),
  createApplication: (id, name, androidCode, iosCode) =>
    dispatch(createApplicationRequest(id, name, androidCode, iosCode)),
  enableOrDisableHandler: (id, enabled) =>
    dispatch(enableOrDisable(id, enabled))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(applicationsScreen)
);
