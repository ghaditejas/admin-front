import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { Android, Delete, ModeEdit, AccessTime, Web, PhoneIphone, Warning } from 'material-ui-icons';
import Switch from 'material-ui/Switch';
import Grid from 'material-ui/Grid';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { SnackbarContent } from 'material-ui/Snackbar';
import message from '../../utils/message';
import styles from './styles';
import { campaignRequest, openDeleteModal, closeDeleteModal, deleteCampaignRequest, enableOrDisable } from './actions';
import formatDate from '../../utils/formatDate';


const CampaignItem = ({
  classes, campaign, deleteHandler, enableOrDisableHandler,
}) => {
  const createdDate = formatDate(campaign.createdAt);
  const scheduledAt = formatDate(campaign.scheduledAt);
  let bAndroid = '';
  let bIos = '';
  let bWeb = '';

  if (campaign.filters.platforms.includes('android')) {
    bAndroid = <Android className={classes.icon} color="disabled" title="Android"/>;
  }
  if (campaign.filters.platforms.includes('ios')) {
    bIos = <PhoneIphone className={classes.icon} color="disabled" title="iOs"/>;
  }
  if (campaign.filters.platforms.includes('webpush')) {
    bWeb = <Web className={classes.icon} color="disabled" title="Web"/>;
  }

  return (
  <Card className={classes.card}>
    <CardMedia
        className={classes.image}
        image="/images/campaignDefault.png"
      />
    <CardContent className={classes.content}>
      <Grid container >
        <Grid item xs={12} sm={8} md={9}>
            <Typography variant="title" className={classes.inline} noWrap>{campaign.name}</Typography>
            <Typography className={classNames(classes.inline, classes.besideTitle)} >({campaign.sendings} {message('mensajes')})</Typography>
            <Typography variant="subheading" color="textSecondary">{createdDate}</Typography>
            {bAndroid}{bIos}{bWeb}
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <div className={classes.rightInfo}>
            <AccessTime color="disabled" />
            <Typography className={classes.schedule} color="textSecondary">
              {scheduledAt !== null ? scheduledAt : message('No programada')}
            </Typography>
          </div>
          <div className={classes.rightButtons}>
            <Switch
              checked={campaign.enabled}
              onChange={() => { enableOrDisableHandler(campaign.id, campaign.enabled !== true); }}
              color="primary"
            />
            <div>
              <Link to={`/campaigns/${campaign.id}`}><ModeEdit className={classes.rightIcon} color="disabled" /></Link>
              <Delete className={classes.rightIcon} color="disabled" onClick={() => deleteHandler(campaign)} />
            </div>
          </div>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  );
};

CampaignItem.propTypes = {
  campaign: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  enableOrDisableHandler: PropTypes.func.isRequired,
};

const DeleteBox = ({
  classes, onClose, campaign, deleteHandler,
}) => (
  <div>
    <Warning color="disabled" className={classes.modalIcon}/>
    <Typography>
      {message('¿Está seguro de querer eliminar la campaña')} <strong> &quot;{campaign.name}&quot; </strong>
      {message('de la plataforma ?')}
    </Typography>
    <br />
    <div className={classes.right}>
      <Divider /><br/>
      <Button variant="raised" color="primary" onClick={() => onClose()}>
        {message('Cancelar')}
      </Button>
      <Button variant="raised" color="secondary" onClick={() => { deleteHandler(campaign.id); }} >
        {message('Eliminar')}
      </Button>
    </div>
  </div>
);

DeleteBox.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func,
  campaign: PropTypes.object,
};

const DeleteModal = ({
  classes, isOpened, onClose, campaign, deleteHandler, isDeletingCampaign, isDeleted, isDeletedError,
}) => {
  let view;
  if (isDeletingCampaign) {
    view = <div className={classes.progress}><CircularProgress /></div>;
  } else if (isDeleted) {
    view = <SnackbarContent className={classes.snackbarOk} message={message('Campaña borrada correctamente')}/>;
  } else if (isDeletedError) {
    view = <SnackbarContent className={classes.snackbarError} message={message('Error al borrar campaña')}/>;
  } else {
    view = <DeleteBox classes={classes} onClose={onClose} campaign={campaign} deleteHandler={deleteHandler} />;
  }
  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
    >
      <DialogTitle> {message('Eliminar campaña')}</DialogTitle>
      <DialogContent className={classes.modalContent}>
      {view}
      </DialogContent>
    </Dialog>
  );
};

DeleteModal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func,
  campaign: PropTypes.object,
  isDeletingCampaign: PropTypes.bool.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  isDeletedError: PropTypes.bool.isRequired,
};

class campaignListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillMount() {
    this.props.initialize(1);
  }

  render() {
    let view;
    if (this.props.isRequesting === true) {
      view = <div className={this.props.classes.progress}><CircularProgress /></div>;
    } else {
      view = this.props.campaignList.map((item, index) => (
        <div key={index}>
          <CampaignItem
            classes={this.props.classes}
            campaign={item}
            deleteHandler={this.props.modalDeleteHandler}
            enableOrDisableHandler={this.props.enableOrDisableHandler}
          /><br/>
        </div>
      ));
    }

    return (
      <div>
        <Grid container>
          <Grid item xs={6}>
            <Typography noWrap variant="headline">{message('Campañas existentes')}</Typography>
          </Grid>
          <Grid item xs={6} className={this.props.classes.headButton}>
            <Link to={'/campaigns/new'}>
              <Button variant="raised" color="primary" onClick={() => {}}>
                {message('Nueva campaña')}
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Typography noWrap variant="subheading">{this.props.campaignList.length} {message('campañas')}</Typography>
          </Grid>
          <Grid item xs={6} className={this.props.classes.right}>
            <Typography noWrap variant="subheading">FILTROS</Typography>
          </Grid>
          <Grid item xs={12}>
            { view }
          </Grid>
        </Grid>
        <DeleteModal classes={this.props.classes}
          isOpened={this.props.isDeleteModalOpened}
          campaignName="test campaign"
          onClose={ this.props.deleteModalClose }
          campaign={this.props.selectedCampaign}
          isDeletingCampaign={this.props.isDeletingCampaign}
          deleteHandler = {this.props.deleteHandler}
          isDeleted={this.props.isDeleted}
          isDeletedError={this.props.isDeletedError}
          />
      </div>
    );
  }
}

campaignListScreen.propTypes = {
  isRequesting: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  campaignList: PropTypes.array.isRequired,
  initialize: PropTypes.func.isRequired,
  modalDeleteHandler: PropTypes.func.isRequired,
  isDeleteModalOpened: PropTypes.bool.isRequired,
  deleteModalClose: PropTypes.func.isRequired,
  selectedCampaign: PropTypes.object.isRequired,
  isDeletingCampaign: PropTypes.bool.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  isDeletedError: PropTypes.bool.isRequired,
  enableOrDisableHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  campaignList: state.campaignList.get('campaignList'),
  isRequesting: state.campaignList.get('requesting'),
  isDeleteModalOpened: state.campaignList.get('isDeleteModalOpened'),
  selectedCampaign: state.campaignList.get('selectedCampaign'),
  isDeletingCampaign: state.campaignList.get('isDeletingCampaign'),
  isDeleted: state.campaignList.get('deletionOk'),
  isDeletedError: state.campaignList.get('deletionError'),
});

const mapDispatchToProps = dispatch => ({
  initialize: appId => dispatch(campaignRequest(appId)),
  modalDeleteHandler: campaign => dispatch(openDeleteModal(campaign)),
  deleteModalClose: () => dispatch(closeDeleteModal()),
  deleteHandler: id => dispatch(deleteCampaignRequest(id)),
  enableOrDisableHandler: (id, enabled) => dispatch(enableOrDisable(id, enabled)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(campaignListScreen));
