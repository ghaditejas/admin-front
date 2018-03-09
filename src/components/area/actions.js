import ActionTypes from './actionTypes';
import AreaService from '../../services/areaService';


export const listAreasResponse = response => ({
  type: ActionTypes.AREA_LIST_RESPONSE,
  payload: response,
});

export const listAreas = () => async (dispatch) => {
  const areas = await AreaService.getAreas(1);
  dispatch(listAreasResponse(areas));
};

export const showArea = areaId => ({
  type: ActionTypes.AREA_LIST_SELECT_AREA,
  areaId,
});

export const showNewAreaWidget = () => ({
  type: ActionTypes.AREA_NEW_SHOW_WIDGET,
});

export const saveSelectedGeometry = geometry => ({
  type: ActionTypes.AREA_NEW_GEOMETRY,
  geometry,
});

export const showEditPropertiesDialog = show => ({
  type: ActionTypes.AREA_SAVE_GEOMETRY_DIALOG,
  show,
});
