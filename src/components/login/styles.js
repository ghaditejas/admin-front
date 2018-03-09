import { green, red, grey } from 'material-ui/colors';

export default theme => ({
  grid: {
    paddingTop: '10%',
  },
  paper: {
    padding: 25,
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },
  paperLogged: {
    padding: 25,
    color: theme.palette.text.secondary,
    background: green['200'],
    textAlign: 'center',
  },
  progress: {
    textAlign: 'center',
  },
  icon: {
    height: 80,
    width: 80,
  },
  input: {
    width: '50%',
  },
  snackbar: {
    background: red['900'],
    color: grey['50'],
  },
});
