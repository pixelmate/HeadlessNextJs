import services from 'services/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromHeaders } from 'utils/auth-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const token = getTokenFromHeaders(req);
      const { productId } = req.query || {};
      const data = await services.product.getSingleProduct(String(productId), token);
      res.json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
