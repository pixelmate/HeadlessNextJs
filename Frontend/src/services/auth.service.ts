import { Auth, OrderCloudError, Tokens } from 'ordercloud-javascript-sdk';
import ocConfig from 'src/config';
import { handleErrors } from 'utils/request';

export const signIn = async (loginInput: SignInUserInput) => {
  try {
    const data = await Auth.Login(
      loginInput.username,
      loginInput.password,
      ocConfig.clientId,
      ocConfig.scope
    );
    const token = data.access_token;
    Tokens.SetAccessToken(token);
    return {
      status: 200,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const anonymousSignIn = async () => {
  try {
    const data = await Auth.Anonymous(ocConfig.clientId, ocConfig.scope);
    const token = data.access_token;
    Tokens.SetAccessToken(token);
    return {
      status: 200,
      accessToken: data.access_token,
    };
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const data = await Auth.RefreshToken(refreshToken, ocConfig.clientId);

    return {
      status: 200,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    return handleErrors(error as OrderCloudError);
  }
};
