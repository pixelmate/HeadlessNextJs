export const mapGiftOrder = (redemptionCode: string) => {
  return {
    search: redemptionCode,
    searchOn: ['RedemptionCode'],
  };
};

export const mapCartPaymentToSpendingAccount = ({
  type,
  spendingAccountDetails,
}: {
  type: string;
  spendingAccountDetails: Partial<GiftCertificateBalance>;
}) => {
  return {
    Type: type,
    Amount: spendingAccountDetails?.Balance,
    SpendingAccountID: spendingAccountDetails?.Id,
  };
};
