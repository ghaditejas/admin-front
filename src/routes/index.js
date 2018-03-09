import React from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from '../components/privateRoute';
import PublicRoute from '../components/publicRoute';
import login from '../components/login';
import profile from '../components/profile';
import AppLayout from '../components/appLayout';
import extAppsListScreen from '../components/toolsScreen/extappsScreen';
import applicationsScreen from '../components/applicationsScreen';
import topicsListScreen from '../components/toolsScreen/topicScreen';
import campaignListScreen from '../components/campaignListScreen';
import areaScreen from '../components/area';
import history from '../utils/history';

const routes = ({ loggedIn }) => (
  <Router history={history}>
      <div className="layOutWrapper">
        <PrivateRoute path="/" loggedIn={loggedIn}>
          <AppLayout>
            <Route path="/externalapps" component={extAppsListScreen}/>
            <Route path="/topics" component={topicsListScreen}/>
            <Route path="/campaigns" component={campaignListScreen}/>
            <Route path="/profile" component={profile}/>
            <Route path="/area" component={areaScreen}/>
            <Route path="/applications" component={applicationsScreen}/>
          </AppLayout>
        </PrivateRoute>
        <PublicRoute path="/login" component={login} loggedIn={loggedIn}/>
      </div>
  </Router>
);

const mapStateToProps = state => ({
  loggedIn: state.global.get('isUserLoggedIn'),
});

routes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(routes);
