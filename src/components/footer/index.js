import React from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Copyright from 'material-ui-icons/Copyright';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

const styles = () => ({
  grid: {
    background: 'rgba(150, 155, 163,0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    padding: 10,
  },
  icon: {
    verticalAlign: 'text-top',
    height: 15,
  },
});

const footer = ({ classes }) => (
    <Grid item xs={12} className={classes.grid}>
      <Typography>
        <Copyright className={classes.icon} />Indigitall 2018
      </Typography>
    </Grid>
);

footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(footer);
