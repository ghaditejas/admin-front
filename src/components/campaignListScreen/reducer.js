import ActionTypes from './actionTypes';
import CampaignListModel from './model';
import createReducer from '../../utils/createReducer';


const campaignListResponse = (state, action) =>
  state.set('campaignList', action.payload)
    .set('requesting', false);

const openDeleteModal = (state, action) => state.set('isDeleteModalOpened', true)
  .set('isDeletingCampaign', false)
  .set('deletionOk', false)
  .set('deletionError', false)
  .set('selectedCampaign', action.payload);

const closeDeleteModal = state => state.set('isDeleteModalOpened', false);

const isDeletingCampaign = state => state.set('isDeletingCampaign', true);

const deletionOk = state => state.set('isDeletingCampaign', false)
  .set('deletionError', false)
  .set('deletionOk', true);

const deletionError = state => state.set('isDeletingCampaign', false)
  .set('deletionOk', false)
  .set('deletionError', true);

const enablingOrDisabling = state => state.set('enablingOrDisabling', true);

const enableOrDisable = (state, action) => {
  const list = state.get('campaignList');
  const itemIndex = list.findIndex(elm => (elm.id === action.payload.id));
  list[itemIndex].enabled = action.payload.enabled;
  return state.set('campaignList', list);
};

const handlers = {
  [ActionTypes.CAMPAIGNLIST_RESPONSE]: campaignListResponse,
  [ActionTypes.CAMPAIGNLIST_MODAL_DELETE_OPEN]: openDeleteModal,
  [ActionTypes.CAMPAIGNLIST_MODAL_DELETE_CLOSE]: closeDeleteModal,
  [ActionTypes.CAMPAIGNLIST_MODAL_DELETING]: isDeletingCampaign,
  [ActionTypes.CAMPAIGNLIST_MODAL_DELETION_OK]: deletionOk,
  [ActionTypes.CAMPAIGNLIST_MODAL_DELETION_ERROR]: deletionError,
  [ActionTypes.CAMPAIGNLIST_ENABLING_OR_DISABLING]: enablingOrDisabling,
  [ActionTypes.CAMPAIGNLIST_ENABLE_OR_DISABLE]: enableOrDisable,
};

export default createReducer(handlers, new CampaignListModel());
