export type GiftCertificate = {
  recipient: string;
  recipientEmail: string;
  message: string;
  amount: number;
  designFormat: string;
  sender?: string;
};

export const initialValueGiftCertificate: GiftCertificate = {
  recipient: '',
  recipientEmail: '',
  message: '',
  amount: 50,
  designFormat: '',
  sender: '',
};
