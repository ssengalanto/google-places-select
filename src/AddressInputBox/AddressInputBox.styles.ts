import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  gridRoot: {
    minWidth: '500px',
    padding: theme.spacing(2),
  },
  input: {
    width: '100%',
    marginTop: 10,
  },
}));
