import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import DoneIcon from 'material-ui-icons/Done';
import EditLocationIcon from 'material-ui-icons/EditLocation';
import Tooltip from 'material-ui/Tooltip';
import Zoom from 'material-ui/transitions/Zoom';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { Map, TileLayer, GeoJSON, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import bbox from '@turf/bbox';
import { connect } from 'react-redux';
import { listAreas, showArea, showNewAreaWidget, saveSelectedGeometry, showEditPropertiesDialog } from './actions';
import styles from './styles';
import message from '../../utils/message';


const TILE_URL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';


const AreaItem = ({ area, active, classes, onAreaItemSelected }) => {
  return (
    <ListItem className={ active ? classes.activeAreaItem: '' } onClick={ () => onAreaItemSelected(area.id) } divider={true}>
      <ListItemText
        primary={area.name}
        secondary='secondary'
      />
      <ListItemSecondaryAction>
        <IconButton>
          <EditIcon />
        </IconButton>
        <Tooltip title={message('Editar las coordenadas')}>
          <IconButton>
            <EditLocationIcon />
          </IconButton>
        </Tooltip>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const AreaItemShowMap = ({ area }) => {
  if (!area) {
    return null;
  }
  const areaBbox = bbox(area.geom);
  const bounds = [[areaBbox[1], areaBbox[0]], [areaBbox[3], areaBbox[2]]];

  return (
    <Map bounds={bounds} style={{ height: '60vh' }}>
      <TileLayer url={TILE_URL}/>
      <GeoJSON key={area.id} data={area.geom} />
    </Map>
  );
};

class EditAreaPropertiesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog
          open={this.props.showEditPropertiesDialog}
          onClose={this.props.onEditAreaPropertiesClose}
        >
          <DialogTitle>{message('Guardar zona')}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={message('Nombre')}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onEditAreaPropertiesClose} color="primary">
              {message('Cancelar')}
            </Button>
            <Button onClick={this.props.onEditAreaPropertiesSave} color="primary">
              {message('Guardar')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

class NewAreaWidget extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this._onCreated = this._onCreated.bind(this);
    this._onDrawStart = this._onDrawStart.bind(this);
    this._onDeleted = this._onDeleted.bind(this);
    this._onEdited = this._onEdited.bind(this);
  }

  _onDrawStart() {
    this.props.onSelectedGeometryDrawn(null);
  }

  _onEdited(e) {
    // As we delete the layers when the user starts drawings, it should be only one layer
    e.layers.eachLayer( (layer) => {
      this.props.onSelectedGeometryDrawn(layer.toGeoJSON().geometry);
    });
  }

  _onCreated(e) {
    this.props.onSelectedGeometryDrawn(e.layer.toGeoJSON().geometry);
  }

  _onDeleted(e) {
    // We put it on the loop to avoid enabling the new polygon toolbar when
    //  clicking on delete and saving without doing anything
    e.layers.eachLayer(() => {
      this.props.onSelectedGeometryDrawn(null);
    });
  }

  render() {
    let polygonOptions = { allowIntersection: false };
    let rectangleOptions = true;
    if (this.props.selectedGeometry) {
      polygonOptions = false;
      rectangleOptions = false;
    }
    return (
      <Map center={[40.7, -3.4]} zoom={6} zoomControl={true} style={{ height: '60vh' }}>
        <TileLayer url={TILE_URL} />
        <FeatureGroup>
            <EditControl
              position='topright'
              onEdited={this._onEdited}
              onCreated={this._onCreated}
              onDrawStart={this._onDrawStart}
              onDeleted={this._onDeleted}
              draw={{
                circle: false,
                circlemarker: false,
                polyline: false,
                marker: false,
                polygon: polygonOptions,
                rectangle: rectangleOptions,
              }}
            />
        </FeatureGroup>
        <Zoom in={this.props.selectedGeometry != null}>
          <Button variant="fab" className={this.props.classes.floatingButton} color='primary' onClick={this.props.onEditAreaPropertiesOpen}>
            <DoneIcon />
          </Button>
        </Zoom>
      </Map>
    );
  }
}


class areaList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillMount() {
    this.props.onRequestAreasCallback();
  }

  render() {
    // Logic related on area selection
    const selectedAreaId = this.props.selectedAreaId;
    const selectedAreas = selectedAreaId != null ? this.props.areas.filter(a => a.id === selectedAreaId) : null;
    const selectedArea = selectedAreas ? selectedAreas[0] : null;

    // Logic related on current action (list areas or create a new one)
    let mapWidget;
    switch (this.props.viewMode) {
      case 'list':
        mapWidget = <AreaItemShowMap area={selectedArea} />;
        break;
      case 'create':
        mapWidget = <NewAreaWidget onSelectedGeometryDrawn={this.props.onSelectedGeometryDrawn}
          selectedGeometry={this.props.selectedGeometry} onEditAreaPropertiesOpen={this.props.onEditAreaPropertiesOpen}
          classes={this.props.classes} />;
        break;
      default:
        mapWidget = null;
    }

    // Render the widget
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="headline">{message('Definir zonas de actuación')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={this.props.classes.paper} >
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="title">{`${this.props.areas.length} ${message('zonas activas')}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button variant="raised" color="primary" style={{ float: 'right' }} onClick={this.props.onNewAreaClick}>
                  {message('Nueva zona')}
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <List>
                  { this.props.areas.map((area, index) => <AreaItem
                      key={index} area={area}
                      active={area.id === this.props.selectedAreaId}
                      classes={this.props.classes}
                      onAreaItemSelected={this.props.onAreaItemSelected}
                  />) }
                </List>
              </Grid>
              <Grid item xs={8} className={this.props.classes.leafletContainer}>
                {mapWidget}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <EditAreaPropertiesDialog classes={this.props.classes} showEditPropertiesDialog={this.props.showEditPropertiesDialog}
          onEditAreaPropertiesClose={this.props.onEditAreaPropertiesClose} onEditAreaPropertiesSave={this.props.onEditAreaPropertiesClose}/>
      </Grid>
    );
  }
}


areaList.propTypes = {
  areas: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  areas: state.area.get('areas'),
  selectedAreaId: state.area.get('selectedAreaId'),
  viewMode: state.area.get('viewMode'),
  selectedGeometry: state.area.get('selectedGeometry'),
  showEditPropertiesDialog: state.area.get('showEditPropertiesDialog'),
});

const mapDispatchToProps = dispatch => ({
  onRequestAreasCallback: () => dispatch(listAreas()),
  onAreaItemSelected: areaId => dispatch(showArea(areaId)),
  onNewAreaClick: () => dispatch(showNewAreaWidget()),
  onSelectedGeometryDrawn: geometry => dispatch(saveSelectedGeometry(geometry)),
  onEditAreaPropertiesOpen: () => dispatch(showEditPropertiesDialog(true)),
  onEditAreaPropertiesClose: () => dispatch(showEditPropertiesDialog(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(areaList));
