import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

import Collapse from 'material-ui/transitions/Collapse';

import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import DvrIcon from 'material-ui-icons/Dvr';
import FilterNoneIcon from 'material-ui-icons/FilterNone';
import ExtensionIcon from 'material-ui-icons/Extension';
import EqualizerIcon from 'material-ui-icons/Equalizer';
import SettingsIcon from 'material-ui-icons/Settings';
import HelpOutlineIcon from 'material-ui-icons/HelpOutline';
import PersonPinCircleIcon from 'material-ui-icons/PersonPinCircle';
import SendIcon from 'material-ui-icons/Send';
import LoyaltyIcon from 'material-ui-icons/Loyalty';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import ShopIcon from 'material-ui-icons/Shop';
import DevicesOtherIcon from 'material-ui-icons/DevicesOther';
import InsertChartIcon from 'material-ui-icons/InsertChart';
import DescriptionIcon from 'material-ui-icons/Description';
import CloudDownloadIcon from 'material-ui-icons/CloudDownload';
import NotificationsIcon from 'material-ui-icons/Notifications';

import styles from './styles';
import message from '../../utils/message';
import { mainMenuCollapse, mainMenuExpand, mainMenuToggle, mainMenuItemToggle } from './actions';


class AppLayout extends React.Component {
  render() {
    const { classes } = this.props;
    const children = this.props.children || '';
    const isOpened = this.props.isOpened;
    const menuItemsOpened = this.props.menuItemsOpened;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>

          {/* Header top bar */}
          <AppBar className={classNames(classes.appBar, isOpened && classes.appBarShift)}>
            <Toolbar className={classes.toolBar} disableGutters={!isOpened}>
              <IconButton
                aria-label="open menu"
                onClick={this.props.handleIconClick}
                className={classNames(classes.indigitallIconButton, isOpened && classes.hide)}
              >
                <img className={classes.icon} alt="indigitall logo" src="/images/logo_indigitall_notificacion.svg" />
              </IconButton>
              <Typography variant="subheading" color="inherit" noWrap className={classes.flex}>
                {`${message('home', true)} > ${message('myCampaigns', true)} > ${message('newMessage', true)}`}
              </Typography>
              <div>
                <IconButton aria-label={message('newMessage')}>
                  <SendIcon />
                </IconButton>
                <IconButton aria-label={message('alerts')}>
                  <Badge
                    classes={{
                      badge: classes.badge,
                    }}
                    badgeContent={4}
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>

          {/* Main menu */}
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !isOpened && classes.drawerPaperClose),
            }}
            open={isOpened}
          >
            <div className={classes.drawerInner}>

              {/* Main menu header */}
              <div className={classes.drawerHeader}>
                <IconButton
                  aria-label="close menu"
                  onClick={this.props.handleLogoClick}
                  className={classes.logoButton}
                >
                  <img className={classes.logo} alt="indigitall logo" src="/images/logo_indigitall.svg" />
                </IconButton>
              </div>

              {/* Main menu options */}
              <List component="nav" className={classNames(classes.drawerContent, classes.pt0)}>

                <ListItem className={classes.menuItemParent} button>
                  <ListItemIcon className={classNames(classes.menuListItemIcon, !isOpened && classes.menuListItemIconClose)}>
                    <DvrIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={message('home')} />
                </ListItem>

                <Divider className={classes.menuDivider} />
                <ListItem button className={classes.menuItemParent} onClick={() => (this.props.handleMenuItemClick(1))}>
                  <ListItemIcon className={classNames(classes.menuListItemIcon, !isOpened && classes.menuListItemIconClose)}>
                    <FilterNoneIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={message('campaigns')} />
                  {menuItemsOpened[1] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={menuItemsOpened[1]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ContentCopyIcon />
                      </ListItemIcon>
                      <ListItemText inset secondary={message('myCampaigns')} />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <SendIcon />
                      </ListItemIcon>
                      <ListItemText secondary={message('newMessage')} />
                    </ListItem>
                  </List>
                </Collapse>

                <Divider className={classes.menuDivider} />
                <ListItem button className={classes.menuItemParent} onClick={() => (this.props.handleMenuItemClick(2))}>
                  <ListItemIcon className={classNames(classes.menuListItemIcon, !isOpened && classes.menuListItemIconClose)}>
                    <ExtensionIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={message('tools')} />
                  {menuItemsOpened[2] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={menuItemsOpened[2]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <LoyaltyIcon />
                      </ListItemIcon>
                      <ListItemText inset secondary={message('topics')} />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ShopIcon />
                      </ListItemIcon>
                      <ListItemText inset secondary={message('externalApps')} />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <PersonPinCircleIcon />
                      </ListItemIcon>
                      <ListItemText inset secondary={message('areas')} />
                    </ListItem>
                  </List>
                </Collapse>

                <Divider className={classes.menuDivider} />
                <ListItem button className={classes.menuItemParent} onClick={() => (this.props.handleMenuItemClick(3))}>
                  <ListItemIcon className={classNames(classes.menuListItemIcon, !isOpened && classes.menuListItemIconClose)}>
                    <EqualizerIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={message('statistics')} />
                  {menuItemsOpened[3] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={menuItemsOpened[3]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <DevicesOtherIcon />
                      </ListItemIcon>
                      <ListItemText inset secondary={message('byDevice')} />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <InsertChartIcon />
                      </ListItemIcon>
                      <ListItemText inset secondary={message('byCampaign')} />
                    </ListItem>
                  </List>
                </Collapse>

                <Divider className={classes.menuDivider} />
                <ListItem button className={classes.menuItemParent}>
                  <ListItemIcon className={classNames(classes.menuListItemIcon, !isOpened && classes.menuListItemIconClose)}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={message('configuration', true)} />
                </ListItem>

                <Divider className={classes.menuDivider} />
                <ListItem button className={classes.menuItemParent} onClick={() => (this.props.handleMenuItemClick(5))}>
                  <ListItemIcon className={classNames(classes.menuListItemIcon, !isOpened && classes.menuListItemIconClose)}>
                    <HelpOutlineIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={message('help')} />
                  {menuItemsOpened[5] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={menuItemsOpened[5]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText inset secondary={message('faq')} />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <CloudDownloadIcon />
                      </ListItemIcon>
                      <ListItemText inset secondary={message('downloads')} />
                    </ListItem>
                  </List>
                </Collapse>

                <Divider className={classes.menuDivider} />
              </List>
            </div>

            {/* Main menu footer */}
            <div className={classes.drawerFooter}>
              <List component="nav">

                {/* Main menu footer language and copyright */}
                <ListItem className={classNames(classes.pb0, !isOpened && classes.menuLanguageClosed)}>
                  <ListItemText secondary={`${message('english', !isOpened)}`} />
                </ListItem>
                <ListItem className={classNames(classes.pt0, !isOpened && classes.hide)}>
                  <ListItemText secondary={`indigitall - ©${(new Date()).getFullYear()}`} />
                </ListItem>

                {/* Main menu footer close button */}
                <ListItem button onClick={this.props.handleDrawerClose}>
                  <ListItemIcon className={classNames(classes.menuListItemIcon, !isOpened && classes.menuCloseIconClosed)}>
                    {isOpened ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </ListItemIcon>
                  <ListItemText className={classes.noWrap} secondary={message('closeMenu')} />
                </ListItem>

              </List>
            </div>
          </Drawer>

          {/* Main container */}
          <main className={classes.content}>
            {children}
          </main>

        </div>
      </div>
    );
  }
}

AppLayout.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  isOpened: PropTypes.bool,
  menuItemsOpened: PropTypes.array,
  handleDrawerClose: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func.isRequired,
  handleIconClick: PropTypes.func.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isOpened: state.appLayout.get('isOpened'),
  menuItemsOpened: state.appLayout.get('menuItemsOpened'),
});

const mapDispatchToProps = disptach => ({
  handleDrawerClose: () => disptach(mainMenuToggle()),
  handleLogoClick: () => disptach(mainMenuCollapse()),
  handleIconClick: () => disptach(mainMenuExpand()),
  handleMenuItemClick: itemIndex => disptach(mainMenuItemToggle(itemIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(AppLayout));
