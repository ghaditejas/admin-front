import ActionTypes from './actionTypes';
import campaignService from '../../services/campaignService';

export const campaignResponse = response => ({
  type: ActionTypes.CAMPAIGNLIST_RESPONSE,
  payload: response,
});

export const campaignRequest = () => async (dispatch) => {
  const campaignRes = await campaignService.getCampaigns(1);
  dispatch(campaignResponse(campaignRes));
};

export const openDeleteModal = campaign => ({
  type: ActionTypes.CAMPAIGNLIST_MODAL_DELETE_OPEN,
  payload: campaign,
});

export const closeDeleteModal = () => ({
  type: ActionTypes.CAMPAIGNLIST_MODAL_DELETE_CLOSE,
});

export const isDeleting = () => ({
  type: ActionTypes.CAMPAIGNLIST_MODAL_DELETING,
});

export const deleteResponse = (res) => {
  if (res === true) {
    return {
      type: ActionTypes.CAMPAIGNLIST_MODAL_DELETION_OK,
      payload: true,
    };
  }
  return {
    type: ActionTypes.CAMPAIGNLIST_MODAL_DELETION_ERROR,
    payload: false,
  };
};

export const deleteCampaignRequest = id => async (dispatch) => {
  dispatch(isDeleting());
  const response = await campaignService.deleteCampaign(id);
  dispatch(deleteResponse(response));
};

export const enableOrDisable = (id, enabled) => ({
  type: ActionTypes.CAMPAIGNLIST_ENABLE_OR_DISABLE,
  payload: {
    id,
    enabled,
  },
});
