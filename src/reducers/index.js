import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import loginReducer from '../components/login/reducer';
import extAppsListReducer from '../components/toolsScreen/extappsScreen/reducer';
import topicsListReducer from '../components/toolsScreen/topicScreen/reducer';
import campaignListReducer from '../components/campaignListScreen/reducer';
import applicationListReducer from '../components/applicationsScreen/reducer';
import profileReducer from '../components/profile/reducer';
import appLayoutReducer from '../components/appLayout/reducer';
import areaReducer from '../components/area/reducer';

export default combineReducers({
  global: globalReducer,
  login: loginReducer,
  extappsList: extAppsListReducer,
  topics:topicsListReducer,
  applicationList: applicationListReducer,
  campaignList : campaignListReducer,
  profile: profileReducer,
  appLayout: appLayoutReducer,
  area: areaReducer,
});
