import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import message from '../../../utils/message';
import styles from './styles';
import { topicsRequest } from './actions';

const ToolsItem = ({ topics }) => (
  <Card>
     <CardContent>
      <Typography variant="title">{topics.name}</Typography>
      <Typography variant="subheading" color="textSecondary">13/12/2017 - 10:20am</Typography>
     </CardContent>
  </Card>
);

class topicsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillMount() {
    this.props.dispatch(topicsRequest());
  }

  render() {
    return (
      <div>
        <Typography noWrap variant="headline">{message('Grupos de Interés')}</Typography>
        <br/>
        { this.props.topicsList.map((item, index) => <div key={index}>ToolsItem topics={item} /><br/></div>) }
      </div>
    );
  }
}

topicsListScreen.propTypes = {
    topicsList: PropTypes.array,
}

const mapStateToProps = state => {
    //console.log(state);
    return {
  topicsList: state.topics.get('topicsList'),
}};

/* const mapDispatchToProps = disptach => ({
  onClickCallback: () => disptach(authUser(document.querySelector('#userEmail').value, document.querySelector('#userPassword').value)),
}); */

export default connect(mapStateToProps)(withStyles(styles)(topicsListScreen));