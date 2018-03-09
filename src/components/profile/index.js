import React from 'react';
// import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleChange, getProfile, changePassword, saveChanges } from './actions';
import styles from './styles';
import languages from '../../utils/languages';
import message from '../../utils/message';
import authService from '../../services/authService';

class profile extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.userId = authService.getUserInfo().userTokenInfo.sub;
    this.props.initialize(this.userId);
  }

  render() {
    const classes = this.props.classes;
    return (
      <Grid
        container
        className={classes.grid}
        spacing={24}
        key={this.userId}>
        <Grid item xs={12}>
          <Typography variant="headline">
            {message('Mi perfil')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="title">
                {message('Identificación')}
              </Typography>
            </Grid>
            <Grid item xs={6}>

                <Grid container>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl} disabled>
                    <InputLabel
                      htmlFor="email"
                      className={classes.email}>{message('Email')}</InputLabel>
                    <Input id="email" value={this.props.email}/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className={classes.pb0}>
                    <Grid container>
                      <Grid
                        item
                        xs={12} className={classes.pb0}>
                        <Grid item xs={6}>
                          <FormControl className={classes.formControl} >
                            <InputLabel htmlFor="currentPassword">{message('Contraseña actual')}</InputLabel>
                            <Input id="currentPassword" type="password"/>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12} className={classes.pb0}>
                        <Grid item xs={6}>
                          <FormControl className={classes.formControl} >
                            <InputLabel htmlFor="newPassword">{message('Cambiar contraseña')}</InputLabel>
                            <Input id="newPassword" type="password"/>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12} className={classes.pt0}>
                        <Grid container >
                          <Grid item xs={12} className={classes.pt0}>
                            <FormControl className={classes.formControl} >
                              <InputLabel htmlFor="repeatPassword">{message('Repetir contraseña')}</InputLabel>
                              <Input id="repeatPassword" type="password"/>
                            </FormControl>
                            <Button
                              className={classes.button}
                              onClick={this.props.onChangePassword({ userId: this.userId })}>
                              Cambiar contraseña
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel htmlFor="enterprise">{message('Empresa')}</InputLabel>
                    <Input id="enterprise" value={this.props.enterprise}/>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel htmlFor="rol">{message('Rol')}</InputLabel>
                    <Input id="rol" value={this.props.rol}/>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="title">
                {message('Datos Personales')}
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.imageUpload}>
              <Grid
                container
                direction="column"
                alignItems="center">
                <Grid item xs={12}>
                  <Avatar className={classes.bigAvatar}>
                    <ImageIcon className={classes.imageIcon}/>
                  </Avatar>
                </Grid>
                <Grid item xs={12}>
                  <Button className={classes.button} disabled>
                    {message('Cambiar foto')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={7}>
                <Grid container>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl} fullWidth >
                      <InputLabel htmlFor="fullname">{message('Nombre y apellidos')}</InputLabel>
                       <Input id="fullname" value={this.props.name} onChange={this.props.handleChange('name')}/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl className={classes.formControl} fullWidth >
                      <TextField
                        select
                        id="language"
                        value={languages[this.props.language]}
                        label={message('Idioma')}
                        className={classes.textField}
                        onChange={this.props.handleChange('language')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        >
                        {Object.keys(languages).map(key => (
                          <MenuItem key={key} value={languages[key]}>
                            {languages[key]}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                <Grid item xs={4}>
                  <Button
                    variant="raised"
                    className={classes.button}
                    onClick={this.props.onSaveChanges(this.userId)}>
                    {message('Guardar cambios')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

profile.propTypes = {
  initialize: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  enterprise: PropTypes.string,
  email: PropTypes.string,
  rol: PropTypes.string,
  name: PropTypes.string,
  language: PropTypes.string,
};

const mapStateToProps = state => ({
  userId: state.profile.get('userId'),
  email: state.profile.get('email'),
  enterprise: state.profile.get('enterprise'),
  rol: state.profile.get('rol'),
  name: state.profile.get('name'),
  language: state.profile.get('language'),
});

const mapDispatchToProps = dispatch => ({
  initialize: userId => dispatch(getProfile(userId)),
  handleChange: name => event => dispatch(handleChange(name, event.target.value)),
  onChangePassword: user => () => dispatch(changePassword(
    user,
    document.querySelector('#currentPassword').value,
    document.querySelector('#newPassword').value,
    document.querySelector('#repeatPassword').value,
  )),
  onSaveChanges: userId => () => dispatch(saveChanges({
    userId,
    name: document.querySelector('#fullname').value,
    lang: document.querySelector('#language').value,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(profile));
