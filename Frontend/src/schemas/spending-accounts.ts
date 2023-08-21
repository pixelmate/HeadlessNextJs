import { chunk } from 'lodash';
import { Payment, SpendingAccount } from 'ordercloud-javascript-sdk';

export const formatRedemptionCode = (code?: string) => {
  const normalizedCode = code?.toUpperCase().replaceAll('-', '');
  const formattedCode = normalizedCode
    ? chunk(normalizedCode, 4)
        .map((arr) => arr.join(''))
        .join('-')
    : '';
  return formattedCode;
};

export const mapPromoCodes = (payments: Payment[], spendingAccounts: SpendingAccount[]) => {
  return payments.map((payment) => {
    const spendingAccount = spendingAccounts.find(
      (account) => account.ID === payment.SpendingAccountID
    );
    const fields = {
      paymentId: payment?.ID,
      spendingAccountId: spendingAccount?.ID,
      redemptionCode: formatRedemptionCode(spendingAccount?.RedemptionCode || ''),
      amount: payment?.Amount,
      currency: payment.Currency,
      balance: spendingAccount?.Balance,
    };
    return fields;
  });
};

export type PromoCode = ReturnType<typeof mapPromoCodes>[number];
