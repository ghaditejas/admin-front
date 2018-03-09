

export default theme => ({
  paper: {
    padding: 25,
  },
  leafletContainer: {
    height: '100%',
    width: '100%',
  },
  activeAreaItem: {
    backgroundColor: 'lightgray',
  },
  floatingButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 1000,
  },
});
