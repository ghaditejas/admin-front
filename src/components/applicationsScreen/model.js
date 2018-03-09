import { Record } from 'immutable';

const model = Record({
  requesting: true,
  applicationList: [],
  applicationDetail: [],
  createApplication:[],
  applicationIdArray : [],
  isDeleteModalOpened: false,
  isAddModalOpened: false,
  isDeletingApplication: false,
  deletionError: false,
  deletionOk: false,
  selectedApplication: {},
  enablingOrDisabling: false,
  ApplicationName :'',
  applicationAndroidCode :'',
  applicationIOSCode:''
});

export default model;
