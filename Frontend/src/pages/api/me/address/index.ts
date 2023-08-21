import type { NextApiRequest, NextApiResponse } from 'next';
import services from 'services/index';
import { getTokenFromHeaders } from 'utils/auth-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const token = getTokenFromHeaders(req);
      const data = await services.me.getAddresses(token);
      res.status(200).json(data);
      break;
    }
    case 'POST': {
      const token = getTokenFromHeaders(req);
      const data = await services.me.addShippingAddress(req.body, token);
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
