import ActionTypes from './actionTypes';
import applicationService from '../../services/applicationService';

export const applicationResponse = (response) => {
  console.log('response://' + response);
  let data = response.map(item => item.id);
 // applicationService.getapplicationDetail(data);
  return{type: ActionTypes.APPLICATIONLIST_RESPONSE, payload: response}
  
};

export const applicationRequest = () => async (dispatch) => {
  const applicationRes = await applicationService.getapplication(2);
  dispatch(applicationResponse(applicationRes));
};


export const applicationDetailResponse = response => ({
  type: ActionTypes.APPLICATIONDETAIL_RESPONSE,
  payload: response,
});


export const applicationDetailRequest = id => async (dispatch) => {
  const applicationDetailRes = await applicationService.getapplicationDetail(id);
  dispatch(applicationDetailResponse(applicationDetailRes));
};

export const createApplicationResponse = (response) => {
  if (response.statusCode === 200) {
    return{
      type: ActionTypes.APPLICATIONLIST_MODAL_ADD_CLOSE,
      //type: ActionTypes.APPLICATIONDETAIL_RESPONSE,
     //payload: response
   }
 }
 
};

export const createApplicationRequest = (id,name,androidCode,iosCode) => async (dispatch) => {
  const applicationRes = await applicationService.createApplication(id,name,androidCode,iosCode);
  dispatch(createApplicationResponse(applicationRes));
};

export const setCreateAppText = (name,androidCode,iosCode) => ({
  type: ActionTypes.CREATE_APPLICATION_TEXT, 
  payload: {
    name,
    androidCode,
    iosCode
  },
});

export const openAddModal = () => ({
  type: ActionTypes.APPLICATIONLIST_MODAL_ADD_OPEN,
 // payload: application,
});

export const closeAddModal = () => ({
  type: ActionTypes.APPLICATIONLIST_MODAL_ADD_CLOSE,
});

export const openDeleteModal = Application => ({
  type: ActionTypes.APPLICATIONLIST_MODAL_DELETE_OPEN,
  payload: application,
});

export const closeDeleteModal = () => ({
  type: ActionTypes.APPLICATIONLIST_MODAL_DELETE_CLOSE,
});



export const isDeleting = () => ({
  type: ActionTypes.APPLICATIONLIST_MODAL_DELETING,
});

export const deleteResponse = (res) => {
  if (res === true) {
    return {
      type: ActionTypes.APPLICATIONLIST_MODAL_DELETION_OK,
      payload: true,
    };
  }
  return {
    type: ActionTypes.APPLICATIONLIST_MODAL_DELETION_ERROR,
    payload: false,
  };
};

export const deleteApplicationRequest = id => async (dispatch) => {
  dispatch(isDeleting());
  const response = await applicationService.deleteApplication(id);
  dispatch(deleteResponse(response));
};

export const enableOrDisable = (id, enabled) => ({
  type: ActionTypes.APPLICATIONLIST_ENABLE_OR_DISABLE,
  payload: {
    id,
    enabled,
  },
});
