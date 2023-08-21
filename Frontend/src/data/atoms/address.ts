import { atom } from 'jotai';

const initialAddress = {
  id: '',
  firstName: '',
  lastName: '',
  companyName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  firstNameBilling: '',
  lastNameBilling: '',
  companyNameBilling: '',
  addressBilling: '',
  cityBilling: '',
  stateBilling: '',
  zipBilling: '',
  areaCodeBilling: '',
  phonePrefixBilling: '',
  phoneLineNumberBilling: '',
  phoneExtBilling: '',
  emailBilling: '',
};

export const address = atom(initialAddress);
