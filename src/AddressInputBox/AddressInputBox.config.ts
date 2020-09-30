export interface AddressState {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  disable: boolean;
}

interface AddressInputBoxConfigOptions {
  required?: boolean;
  name: Exclude<keyof AddressState, 'disable'>;
  label?: string;
}

export const addressInputBoxFields: AddressInputBoxConfigOptions[] = [
  {
    required: true,
    name: 'addressLine1',
    label: 'Address Line 1',
  },
  {
    name: 'addressLine2',
    label: 'Address Line 2',
  },
  {
    required: true,
    name: 'city',
    label: 'City',
  },
  {
    required: true,
    name: 'state',
    label: 'State',
  },
  {
    required: true,
    name: 'zipCode',
    label: 'Zip Code',
  },
];
