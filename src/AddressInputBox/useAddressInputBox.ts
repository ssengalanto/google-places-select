/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useCallback, useState } from 'react';

import { AddressState } from './AddressInputBox.config';

let autocomplete: google.maps.places.Autocomplete;

export type useAddressInputBox = ReturnType<typeof useAddressInputBox>;

const formFields: { [key: string]: keyof google.maps.GeocoderAddressComponent } = {
  street_number: 'short_name',
  route: 'long_name', // addressLine1
  administrative_area_level_1: 'short_name', // state
  locality: 'long_name', // city
  postal_code: 'short_name', // zipCode
};

export const useAddressInputBox = () => {
  const [query, setQuery] = useState('');
  const [addressState, setAddressState] = useState<AddressState>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleQueryChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }) => {
      setQuery(value);
    },
    [],
  );

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { name, value } }) => {
      setAddressState({
        ...addressState,
        [name]: value,
      });
    },
    [addressState],
  );

  const handleSelect = useCallback(() => {
    const place = autocomplete.getPlace();

    const fields = (place.address_components as google.maps.GeocoderAddressComponent[]).reduce(
      (acc, cur) => {
        const addressType = cur.types[0];
        if (formFields[addressType]) {
          const val = cur[formFields[addressType]];
          if (val instanceof Array) {
            acc[addressType] = val.join(' ');
          } else {
            acc[addressType] = val;
          }
        }
        return acc;
      },
      {} as { [key: string]: string },
    );

    setQuery(place.formatted_address || '');

    setAddressState({
      ...addressState,
      addressLine1:
        fields.street_number && fields.route ? `${fields.street_number} ${fields.route}` : '',
      city: fields.locality || '',
      state: fields.administrative_area_level_1 || '',
      zipCode: fields.postal_code || '',
    });
  }, [addressState]);

  const handleLoadScript = useCallback(() => {
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement,
      {},
    );

    autocomplete.setFields(['address_components', 'formatted_address']);

    autocomplete.addListener('place_changed', handleSelect);
  }, [handleSelect]);

  return {
    models: { query, addressState },
    operations: { handleQueryChange, handleAddressChange, handleLoadScript },
  };
};
