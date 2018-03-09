import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import message from '../../../utils/message';
import styles from './styles';
import { extAppsRequest } from './actions';

const ToolsItem = ({ extapps }) => (
  <Card>
     <CardContent>
      <Typography variant="title">{extapps.name}</Typography>
      <Typography variant="subheading" color="textSecondary">13/12/2017 - 10:20am</Typography>
     </CardContent>
  </Card>
);

class extAppsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillMount() {
    this.props.onExtApps();
  }

  render() {
    return (
      <div>
        <Typography noWrap variant="headline">{message('Aplicaciones externas')}</Typography>
        <br/>
        { this.props.extAppsList.map((item, index) => <div key={index}><ToolsItem extapps={item}/><br/></div>) }
      </div>
    );
  }
}

extAppsListScreen.propTypes = {
  extAppsList: PropTypes.array,
};

const mapStateToProps = state => ({
  extAppsList: state.extappsList.get('extAppsList'),
});

const mapDispatchToProps = dispatch => ({
  //onClickCallback: () => disptach(authUser(document.querySelector('#userEmail').value, document.querySelector('#userPassword').value)),
  onExtApps: () => dispatch(extAppsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(extAppsListScreen));