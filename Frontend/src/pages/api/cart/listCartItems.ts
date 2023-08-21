import services from 'services/index';
import { getTokenFromHeaders } from 'utils/auth-utils';
import type { NextApiRequest, NextApiResponse } from 'next';
interface CartItemsRequest extends NextApiRequest {
  query: {
    products: string;
  };
}
const handler = async (req: CartItemsRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const token = getTokenFromHeaders(req);
      const data = await services.me.getCartItems(req.query.products, token);
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
