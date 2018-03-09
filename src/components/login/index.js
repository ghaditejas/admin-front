import React from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import PermIdentity from 'material-ui-icons/PermIdentity';
import Done from 'material-ui-icons/Done';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { SnackbarContent } from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import Footer from '../footer';
import { authUser } from './actions';
import styles from './styles';
import message from '../../utils/message';

const LoginBox = ({
  classes, onClickCallback, mailError, passwordError,
}) => (
  <div>
    <FormControl required>
      <Input
          error = {mailError}
          id='userEmail'
          placeholder="email"
          type="email"
          startAdornment={
            <InputAdornment position="start">
              <PermIdentity />
            </InputAdornment>
          }
        />
    </FormControl>
    <br/>
    <FormControl required>
      <Input
          error = {passwordError}
          id='userPassword'
          type='password'
          placeholder="password"
          startAdornment={
            <InputAdornment position="start">
              <PermIdentity />
            </InputAdornment>
          }
        />
    </FormControl>
    <br/><br/>
    <Button variant="raised" color="primary" className={classes.button} onClick = {onClickCallback}>
      {message('Entrar')}
    </Button>
  </div>
);

LoginBox.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  mailError: PropTypes.bool.isRequired,
  passwordError: PropTypes.bool.isRequired,
};

const login = ({
  classes, onClickCallback, loggedIn, isDoingLoggin, mailError, passwordError, authError,
}) => {
  let view;
  let error;

  if (!isDoingLoggin && !loggedIn) {
    view = <LoginBox classes={classes} onClickCallback={onClickCallback} mailError={mailError} passwordError={passwordError}/>;
  } else if (isDoingLoggin && !loggedIn) {
    view = <div className={classes.progress}><CircularProgress /></div>;
  } else {
    view = (
      <Paper className={classes.paperLogged} elevation={4} square={true} >
        <Done className={classes.icon} />
      </Paper>
    );
  }

  if (authError) {
    error = (
    <div>
      <SnackbarContent className={classes.snackbar} message={message('Credenciales no válidos')}/>
      <br/>
    </div>);
  }

  return (
    <Grid container className={classes.grid} spacing={0}>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper} elevation={4} square={true} >
        {error}
        {view}
        </Paper>
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Footer />
    </Grid>
  );
};

login.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  isDoingLoggin: PropTypes.bool.isRequired,
  mailError: PropTypes.bool.isRequired,
  passwordError: PropTypes.bool.isRequired,
  authError: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.login.get('loggedIn'),
  isDoingLoggin: state.login.get('isDoingLoggin'),
  mailError: state.login.get('mailError'),
  passwordError: state.login.get('passwordError'),
  authError: state.login.get('authError'),
});

const mapDispatchToProps = dispatch => ({
  onClickCallback: () => dispatch(authUser(document.querySelector('#userEmail').value, document.querySelector('#userPassword').value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(login));
