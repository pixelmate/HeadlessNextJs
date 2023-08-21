import { BUYER } from 'constants/user';
import { OrderCloudError, SpendingAccount, SpendingAccounts } from 'ordercloud-javascript-sdk';
import { handleErrors } from 'utils/request';

export const getSpendingAccounts = async (
  redemptionCode: { code: string },
  accessToken?: string
) => {
  try {
    const response = await SpendingAccounts.List(
      BUYER,
      {
        search: redemptionCode.code,
        searchOn: ['RedemptionCode'],
      },
      { accessToken }
    );
    return response;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const getSpendingAccountsByIds = async (ids: string[], accessToken?: string) => {
  const response = await Promise.all(
    ids.map((id) =>
      SpendingAccounts.List(
        BUYER,
        {
          search: id,
          searchOn: ['ID'],
        },
        { accessToken }
      )
    )
  );
  const spendingAcconts = (response?.flatMap((item) => item?.Items) as SpendingAccount[]) || [];
  return spendingAcconts;
};
