
const appBarHeight = 64;
const appBarHeightXs = 64;
const menuWidth = 250;
const menuClosedWidth = 65;
const menuFooterHeight = 128;


export default theme => ({
  root: {
    width: '100%',
    height: '100%',
    // marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#FFFFFF',
    color: '#A3A4A5',
    boxShadow: '2px 2px 4px -1px rgba(0, 0, 0, 0.2), 4px 4px 5px 0px rgba(0, 0, 0, 0.05), 1px 1px 10px 0px rgba(0, 0, 0, 0.01)',
  },
  appBarShift: {
    zIndex: theme.zIndex.drawer - 1,
    marginLeft: menuWidth,
    width: `calc(100% - ${menuWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  indigitallIconButton: {
    marginLeft: 8,
    marginRight: 36,
    height: appBarHeightXs,
    [theme.breakpoints.up('sm')]: {
      height: appBarHeight,
    },
  },
  icon: {
    height: `calc(${appBarHeightXs}px - 15px)`,
    [theme.breakpoints.up('sm')]: {
      height: `calc(${appBarHeight}px - 15px)`,
    },
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: menuWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: '2px 2px 4px -1px rgba(0, 0, 0, 0.2), 4px 4px 5px 0px rgba(0, 0, 0, 0.05), 1px 1px 10px 0px rgba(0, 0, 0, 0.01)',
  },
  menuDivider: {
    backgroundColor: '#FFFFFF',
    height: 2,
  },
  drawerPaperClose: {
    width: menuClosedWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: menuWidth,
    height: `calc(100% - ${menuFooterHeight}px)`,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - ${menuFooterHeight}px)`,
    },
    backgroundColor: '#F5F5F5',
  },
  drawerContent: {
    height: `calc(100% - ${appBarHeightXs}px)`,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - ${appBarHeight}px)`,
    },
    overflow: 'auto',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  menuListItemIcon: {
    marginRight: '0px',
  },
  menuListItemIconClose: {
    margin: '0 10px 0 4px',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.mixins.toolbar,
    boxShadow: '2px 2px 4px -1px rgba(0, 0, 0, 0.2), 4px 4px 5px 0px rgba(0, 0, 0, 0.05), 1px 1px 10px 0px rgba(0, 0, 0, 0.01)',
    backgroundColor: '#FFFFFF',
  },
  menuItemParent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  logoButton: {
    height: appBarHeightXs,
    [theme.breakpoints.up('sm')]: {
      height: appBarHeight,
    },
  },
  logo: {
    height: appBarHeightXs,
    [theme.breakpoints.up('sm')]: {
      height: appBarHeight,
    },
  },
  drawerFooter: {
    height: menuFooterHeight,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    ...theme.mixins.toolbar,
    backgroundColor: '#F5F5F5',
  },
  menuLanguageClosed: {
    paddingLeft: 24,
  },
  menuCloseIconClosed: {
    marginRight: 5,
    marginLeft: 4,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 24,
    paddingBottom: 100,
    height: `calc(100% - ${appBarHeightXs}px)`,
    marginTop: appBarHeightXs,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - ${appBarHeight}px)`,
      marginTop: appBarHeight,
    },
    overflow: 'auto',
  },
  badge: {
    backgroundColor: '#FF5D5D',
    top: -5,
    width: 16,
    right: -5,
    height: 16,
    color: '#FFFFFF',
    boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  flex: {
    flex: 1,
  },
  pb0: {
    paddingBottom: 0,
  },
  pt0: {
    paddingTop: 0,
  },
  pl5: {
    paddingLeft: 5,
  },
  pl20: {
    paddingLeft: 20,
  },
  pl40: {
    paddingLeft: 40,
  },
  pl80: {
    paddingLeft: 80,
  },
});
