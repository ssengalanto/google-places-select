import React, { useState } from 'react';
import Script from 'react-load-script';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { useStyles } from './AddressInputBox.styles';

const autocomplete: { current: null | google.maps.places.Autocomplete } = {
  current: null,
};

export const AddressInputBox: React.FC = () => {
  const [address, setAddress] = useState('');
  const classes = useStyles();

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setAddress(e.target.value);
  };

  const handleScriptLoad = (): void => {
    const options = {};

    const element = document.getElementById('autocomplete') as HTMLInputElement;
    autocomplete.current = new google.maps.places.Autocomplete(element, options);

    autocomplete.current.setFields(['address_components', 'formatted_address']);

    autocomplete.current.addListener('place_changed', handlePlaceSelect);
  };

  const handlePlaceSelect = (): void => {
    if (!autocomplete.current) return;
    const response = autocomplete.current.getPlace();

    const address = response.address_components;

    if (address) {
      setAddress(response.formatted_address || '');
    }
  };

  return (
    <>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
        onLoad={handleScriptLoad}
      />
      <Grid classes={{ root: classes.gridRoot }}>
        <TextField
          style={{ width: '100%' }}
          variant="outlined"
          id="autocomplete"
          label="Location"
          placeholder=""
          InputLabelProps={{ shrink: !!address }}
          onChange={handleAddressChange}
          value={address}
        />
      </Grid>
    </>
  );
};
