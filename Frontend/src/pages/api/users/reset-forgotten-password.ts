import services from 'services/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromHeaders } from 'utils/auth-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      const token = getTokenFromHeaders(req);
      const { email, username, url } = req?.body || {};
      const data = await services.users.resetForgottenPassword(email, username, url, token);
      res.status(204).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
