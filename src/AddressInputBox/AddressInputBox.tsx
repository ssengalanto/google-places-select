import React from 'react';
import Script from 'react-load-script';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { addressInputBoxFields } from './AddressInputBox.config';

import { useStyles } from './AddressInputBox.styles';
import { useAddressInputBox } from './useAddressInputBox';

export const AddressInputBox: React.FC = () => {
  const classes = useStyles();
  const {
    models: { query, addressState },
    operations: { handleQueryChange, handleAddressChange, handleLoadScript },
  } = useAddressInputBox();

  return (
    <>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
        onLoad={handleLoadScript}
      />
      <Grid classes={{ root: classes.gridRoot }}>
        <TextField
          classes={{ root: classes.input }}
          variant="outlined"
          id="autocomplete"
          label="Location"
          InputLabelProps={{ shrink: !!query }}
          onChange={handleQueryChange}
          value={query}
        />
        {addressInputBoxFields.map(({ name, label, required }) => (
          <Grid item xs={12} key={name}>
            <TextField
              disabled
              classes={{ root: classes.input }}
              required={required}
              name={name}
              label={label}
              InputLabelProps={{ shrink: !!addressState[name] }}
              value={addressState[name]}
              onChange={handleAddressChange}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
