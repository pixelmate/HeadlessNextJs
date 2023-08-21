import { OrderCloudError, Products } from 'ordercloud-javascript-sdk';
import { handleErrors } from 'utils/request';

export const getSingleProduct = async (id: string, accessToken?: string) => {
  try {
    const response = await Products.Get(id, { accessToken });
    return response as Product;
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};
