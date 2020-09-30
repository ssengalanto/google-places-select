import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  gridRoot: {
    maxWidth: '500px',
    width: '100%',
    padding: theme.spacing(2),
  },
  input: {
    width: '100%',
    marginTop: 10,
  },
}));
