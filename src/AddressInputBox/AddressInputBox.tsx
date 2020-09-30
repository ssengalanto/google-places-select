import React, { useState } from 'react';
import Script from 'react-load-script';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { addressInputBoxFields, AddressState } from './AddressInputBox.config';

import { useStyles } from './AddressInputBox.styles';

let autocomplete: google.maps.places.Autocomplete;

export const AddressInputBox: React.FC = () => {
  const [query, setQuery] = useState('');
  const [addressState, setAddressState] = useState<AddressState>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const classes = useStyles();

  const handleQueryChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setQuery(value);
  };

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setAddressState({
      ...addressState,
      [name]: value,
    });
  };

  const handleScriptLoad = (): void => {
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement,
      { type: 'geocode' },
    );

    autocomplete.setFields(['address_components', 'formatted_address']);

    autocomplete.addListener('place_changed', handlePlaceSelect);
  };

  const handlePlaceSelect = (): void => {
    const response = autocomplete.getPlace();

    const address = response.address_components;

    if (address) setQuery(response.formatted_address || '');
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
          InputLabelProps={{ shrink: !!query }}
          onChange={handleQueryChange}
          value={query}
        />
        {addressInputBoxFields.map(({ name, label, required }) => (
          <Grid item xs={12} key={name}>
            <TextField
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
