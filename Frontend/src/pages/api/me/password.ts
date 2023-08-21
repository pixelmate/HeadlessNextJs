import type { NextApiRequest, NextApiResponse } from 'next';
import services from 'services/index';
import { getTokenFromHeaders } from 'utils/auth-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      const token = getTokenFromHeaders(req);
      const data = await services.me.updatePassword(req.body, token);
      res.status(data.status).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
