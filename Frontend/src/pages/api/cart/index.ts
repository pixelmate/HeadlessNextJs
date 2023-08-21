import services from 'services/index';
import { getTokenFromHeaders } from 'utils/auth-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const token = getTokenFromHeaders(req);
      const data = await services.cart.getCart(token as string);
      res.status(200).json(data);
      break;
    }
    case 'PATCH': {
      const token = getTokenFromHeaders(req);
      const data = await services.cart.updateCart(req.body, token as string);
      res.status(200).json(data);
      break;
    }
    case 'PUT': {
      const token = getTokenFromHeaders(req);
      const data = await services.cart.modifyCart(req.body, token as string);
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
