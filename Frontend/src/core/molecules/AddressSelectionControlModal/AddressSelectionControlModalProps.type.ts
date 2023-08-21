export interface AddressSelectionControlModalProps {
  address: AddressItem;
  recommendedAddress: AddressItem;
  checkBoxName: string;
  headerTitle: string;
  bodyMessage: string;
  isAuthenticated?: boolean;
  confirmAction: (selectedAddress: AddressItem, needUpdate: boolean) => void;
}

export type CheckedVariant = 'primary' | 'secondary' | '';
