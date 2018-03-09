import ActionTypes from './actionTypes';
import ApplicationListModel from './model';
import createReducer from '../../utils/createReducer';


const applicationListResponse = (state, action) =>
  state.set('applicationList', action.payload)
   // .set('requesting', false);


const applicationDetailResponse = (state, action) =>
  state.set('applicationDetail', [].concat.apply(state.applicationDetail, action.payload))
    .set('requesting', false);


    const createApplicationResponse = (state, action) =>
  state.set('createApplication', action.payload)
    .set('requesting', false);

const openDeleteModal = (state, action) => state.set('isDeleteModalOpened', true)
  .set('isDeletingApplication', false)
  .set('deletionOk', false)
  .set('deletionError', false)
  .set('selectedApplication', action.payload);

const closeDeleteModal = state => state.set('isDeleteModalOpened', false);

const setCreateAppText  = (state, action) => {
  return (  state.set('ApplicationName', action.payload.name)
 .set('applicationAndroidCode', action.payload.androidCode)
  .set('applicationIOSCode', action.payload.iosCode));

}


const openAddModal = state => state.set('isAddModalOpened', true);
 
const closeAddModal = state => state.set('isAddModalOpened', false);

const isDeletingApplication = state => state.set('isDeletingApplication', true);

const deletionOk = state => state.set('isDeletingApplication', false)
  .set('deletionError', false)
  .set('deletionOk', true);

const deletionError = state => state.set('isDeletingApplication', false)
  .set('deletionOk', false)
  .set('deletionError', true);

const enablingOrDisabling = state => state.set('enablingOrDisabling', true);

const enableOrDisable = (state, action) => {
  const list = state.get('applicationList');
  const itemIndex = list.findIndex(elm => (elm.id === action.payload.id));
  list[itemIndex].enabled = action.payload.enabled;
  return state.set('applicationList', list);
};

const handlers = {
  [ActionTypes.APPLICATIONLIST_RESPONSE]: applicationListResponse,
  [ActionTypes.APPLICATIONDETAIL_RESPONSE]: applicationDetailResponse,
  [ActionTypes.CREATE_APPLICATION_RESPONSE]:createApplicationResponse,
  [ActionTypes.APPLICATIONLIST_MODAL_ADD_OPEN]: openAddModal,
  [ActionTypes.APPLICATIONLIST_MODAL_ADD_CLOSE]: closeAddModal,
  [ActionTypes.APPLICATIONLIST_MODAL_DELETE_OPEN]: openDeleteModal,
  [ActionTypes.APPLICATIONLIST_MODAL_DELETE_CLOSE]: closeDeleteModal,
  [ActionTypes.APPLICATIONLIST_MODAL_DELETING]: isDeletingApplication,
  [ActionTypes.APPLICATIONLIST_MODAL_DELETION_OK]: deletionOk,
  [ActionTypes.APPLICATIONLIST_MODAL_DELETION_ERROR]: deletionError,
  [ActionTypes.APPLICATIONLIST_ENABLING_OR_DISABLING]: enablingOrDisabling,
  [ActionTypes.APPLICATIONLIST_ENABLE_OR_DISABLE]: enableOrDisable,
  [ActionTypes.CREATE_APPLICATION_TEXT]:setCreateAppText
};

export default createReducer(handlers, new ApplicationListModel());
