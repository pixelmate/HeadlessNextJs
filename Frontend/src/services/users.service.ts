import { handleErrors } from 'utils/request';
import { ForgottenPassword, OrderCloudError, Searchable, Users } from 'ordercloud-javascript-sdk';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';

export const getRealnameValid = async (realname: string, accessToken?: string) => {
  try {
    const response = await Users.List(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_ID!,
      {
        filters: { 'xp.FileNum': realname },
      },
      { accessToken }
    );
    return { valid: response.Items.length > 0 };
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const getUserByXpProperty = async (
  value: string,
  property: keyof UserXp,
  accessToken?: string
) => {
  try {
    const response = await Users.List(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_ID!,
      {
        filters: {
          [`xp.${property}`]: value,
        },
      },
      { accessToken }
    );

    const user: UserInfo | undefined = response?.Items?.find(
      (item: UserInfo) => item?.['xp']?.[property] === value
    );
    return user;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const resetForgottenPassword = async (
  email: string,
  username: string,
  url: string,
  accessToken?: string
) => {
  try {
    const publicUrl = getPublicUrl();
    const response = await ForgottenPassword.SendVerificationCode(
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ClientID: process.env.NEXT_PUBLIC_ORDERCLOUD_CLIENT_ID!,
        Email: email,
        Username: username,
        URL: `${publicUrl}${url}`,
      },
      { accessToken }
    );
    return response;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const getUserByParam = async (
  search: string,
  param: Searchable<'Users.List'>[number],
  accessToken?: string
) => {
  try {
    const response = await Users.List(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_ID!,
      {
        search: search,
        searchOn: [param],
      },
      { accessToken }
    );
    const user: UserInfo | undefined = response?.Items?.find(
      (item: UserInfo) => item?.[param] === search
    );
    return user;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};
