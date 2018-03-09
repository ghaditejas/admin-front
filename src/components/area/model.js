import { Record } from 'immutable';

const model = Record({
  areas: [],
  selectedAreaId: null,
  viewMode: null,
  selectedGeometry: null,
  showEditPropertiesDialog: false,
});

export default model;
