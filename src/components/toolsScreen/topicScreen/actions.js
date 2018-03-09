import actionTypes from './actionTypes';
import toolsService from '../../../services/toolsService';

export const topicsResponse = response => ({
   type: actionTypes.TOPICLIST_RESPONSE,
   payload: response,
});

export const topicsRequest = () => async (dispatch) => {
  const topicsRes = await toolsService.getTopics(1);
  dispatch(topicsResponse(topicsRes));
};