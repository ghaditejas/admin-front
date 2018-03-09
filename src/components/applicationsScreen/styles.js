import { grey, lightGreen, red } from 'material-ui/colors';

export default theme => ({
  progress: {
    textAlign: 'center',
  },
  applictntitle : {
    height : 60,
    border : `1px solid ${grey[300]}`,
    padding : 10,
   // textAlign: 'left',
    display: 'flex',
    //justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    
  },
  dialogText : {
    textAlign: 'left',
  },
 
  cardiTem: {
    marginTop : 10,
  },
  appheader:{
    height: 55,
    border : `1px solid ${grey[300]}`,
    background: '#d2d2d2',
    marginTop : 10,
    display: 'flex',
   // justifyContent: 'center',
    //alignItems: 'center',
  },
  inline: {
    display: 'inline',
  },
  icon: {
    width: 20,
  },
  modalIcon: {
    width: 40,
    height: 40,
  },
  image: {
    width: 100,
    height: 100,
    borderRight: `1px solid ${grey[300]}`,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  content: {
    flex: '1 0 auto',
    padding: 10,
    '&:last-child': {
      paddingBottom: 0,
    },
    maxWidth: '100%',
  },
  card: {
    display: 'flex',
  },
  besideTitle: {
    marginLeft: 10,
  },
  center: {
    textAlign: 'center',
  },
  rightButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 10,
  },
  rightInfo: {
    marginLeft: 12,
  },
  rightIcon: {
    width: 25,
    cursor: 'pointer',
    '&:hover': {
      fill: theme.palette.primary.light,
    },
  },
  right: {
    textAlign: 'right',
  },
  schedule: {
    display: 'inline',
    verticalAlign: 'top',
    marginLeft: 5,
  },
  modalContent: {
    textAlign: 'center',
    '& button': {
      marginLeft: 5,
    },
  },
  snackbarOk: {
    background: lightGreen[200],
    color: grey['900'],
    textAlign: 'center',
  },
  snackbarError: {
    background: red['900'],
    color: grey['50'],
    textAlign: 'center',
  },
  headButton: {
    textAlign: 'right',
    '& a': {
      textDecoration: 'none',
    },
  },
});
