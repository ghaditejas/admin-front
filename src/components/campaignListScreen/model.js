import { Record } from 'immutable';

const model = Record({
  requesting: true,
  campaignList: [],
  isDeleteModalOpened: false,
  isDeletingCampaign: false,
  deletionError: false,
  deletionOk: false,
  selectedCampaign: {},
  enablingOrDisabling: false,
});

export default model;
