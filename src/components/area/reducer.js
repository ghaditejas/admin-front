import ActionTypes from './actionTypes';
import AreaModel from './model';
import createReducer from '../../utils/createReducer';


const areaListResponse = (state, action) => {
  const areas = action.payload;
  const selectedAreaId = areas && areas.length ? areas[0].id : null;
  return state.set('areas', areas)
    .set('selectedAreaId', selectedAreaId)
    .set('viewMode', 'list');
};

const areaListSelectArea = (state, action) => state.set('selectedAreaId', action.areaId)
  .set('viewMode', 'list');

const areaNewShowWidget = state => state.set('selectedAreaId', null)
  .set('viewMode', 'create')
  .set('selectedGeometry', null);

const areaSelectedGeometry = (state, action) => state.set('selectedGeometry', action.geometry);

const areaEditPropertiesShowDialog = (state, action) => state.set('showEditPropertiesDialog', action.show);

const handlers = {
  [ActionTypes.AREA_LIST_RESPONSE]: areaListResponse,
  [ActionTypes.AREA_LIST_SELECT_AREA]: areaListSelectArea,
  [ActionTypes.AREA_NEW_SHOW_WIDGET]: areaNewShowWidget,
  [ActionTypes.AREA_NEW_GEOMETRY]: areaSelectedGeometry,
  [ActionTypes.AREA_SAVE_GEOMETRY_DIALOG]: areaEditPropertiesShowDialog,
};

export default createReducer(handlers, new AreaModel());
