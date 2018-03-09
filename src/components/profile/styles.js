import { grey } from 'material-ui/colors';

export default theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  email: {

  },
  password: {
    marginTop: 32,
  },
  passwordInput: {
    marginBottom: 16,
  },
  imageUpload: {
    borderRight: `1.25px solid ${grey[300]}`,
  },
  bigAvatar: {
    width: 90,
    height: 90,
  },
  imageIcon: {
    width: 60,
    height: 60,
  },
  pt0: {
    paddingTop: '0 !important',
  },
  pr0: {
    paddingRight: '0 !important',
  },
  pb0: {
    paddingBottom: '0 !important',
  },
  pl0: {
    paddingLeft: '0 !important',
  },
  mt0: {
    marginTop: '0 !important',
  },
  mr0: {
    marginRight: '0 !important',
  },
  mb0: {
    marginBottom: '0 !important',
  },
  ml0: {
    marginLeft: '0 !important',
  },
});
