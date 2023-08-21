import { signIn } from './auth.service';
import { parseJwt } from 'utils/auth-utils';
import { handleErrors } from 'utils/request';
import { mapToUser, mapUser, mapUserGroups } from '../schemas/user';
import { mapOCBuyerProduct } from '../schemas/listItems';
import { Me, OrderCloudError } from 'ordercloud-javascript-sdk';
import { mapQueryOptions } from 'src/schemas/helpers';

export const getUser = async (accessToken?: string) => {
  try {
    const response = await Me.Get({ accessToken });
    return mapUser(response);
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const getUserGroups = async (accessToken?: string) => {
  try {
    const response = await Me.ListUserGroups({}, { accessToken });
    return mapUserGroups(response.Items);
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const updateUser = async (updateUser: Partial<User>, accessToken?: string) => {
  try {
    const data = mapToUser(updateUser);
    const updatedUser = await Me.Patch(data, { accessToken });

    return {
      status: 200,
      user: mapUser(updatedUser),
    };
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const updatePassword = async (userInput: UpdateUserPasswordInput, accessToken?: string) => {
  try {
    const decodedAccessToken = parseJwt(accessToken as string);
    const response = await signIn({
      username: decodedAccessToken.usr,
      password: userInput.oldPassword,
    });

    if (response?.status === 200) {
      const updatedUser = await Me.Patch({ Password: userInput.password }, { accessToken });

      return {
        status: 200,
        user: mapUser(updatedUser),
      };
    }

    return {
      status: 400,
      message: 'Old password is incorrect',
    };
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const getCartItems = async (products: string, accessToken?: string) => {
  try {
    const response = await Me.ListProducts(
      {
        searchOn: ['ID'],
        search: products,
      },
      { accessToken }
    );
    return mapOCBuyerProduct(response.Meta, response.Items);
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const getAddresses = async (accessToken?: string) => {
  try {
    const response = await Me.ListAddresses({}, { accessToken });
    return response;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const updateShippingAddress = async (
  id: string,
  body: Partial<AddressItem>,
  accessToken?: string
) => {
  try {
    const response = await Me.PatchAddress(id, body, { accessToken });

    return {
      status: 200,
      address: response,
    };
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const addShippingAddress = async (body: Partial<AddressItem>, accessToken?: string) => {
  try {
    const response = await Me.CreateAddress(body, { accessToken });

    return {
      status: 200,
      address: response,
    };
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const getGiftCards = async () => {
  try {
    const response = await Me.ListSpendingAccounts();
    return response;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const getOrders = async (query?: RequestQuery) => {
  try {
    const options = mapQueryOptions(query);
    const response = await Me.ListOrders(options);
    return response;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};
