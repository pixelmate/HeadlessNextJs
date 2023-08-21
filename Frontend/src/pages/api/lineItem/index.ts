import type { NextApiRequest, NextApiResponse } from 'next';
import services from 'services/index';
import { getTokenFromHeaders } from 'utils/auth-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PUT': {
      const token = getTokenFromHeaders(req);
      const data = await services.lineItem.updateCartItem(req.body, token as string);
      res.status(200).json(data);
      break;
    }
    case 'POST': {
      const data = await services.lineItem.addCartItem(req.body);
      res.status(200).json(data);
      break;
    }
    case 'DELETE': {
      const token = getTokenFromHeaders(req);
      const data = await services.lineItem.deleteCartItem(req.body.ID, token as string);
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
