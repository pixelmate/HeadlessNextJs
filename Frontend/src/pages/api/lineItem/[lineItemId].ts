import type { NextApiRequest, NextApiResponse } from 'next';
import services from 'services/index';
import { getTokenFromHeaders } from 'utils/auth-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { lineItemId } = req.query;
  switch (req.method) {
    case 'PATCH': {
      const token = getTokenFromHeaders(req);
      const data = await services.lineItem.updateCartItem(
        { ...req.body, id: lineItemId },
        token as string
      );
      res.status(200).json(data);
      break;
    }
    case 'DELETE': {
      const token = getTokenFromHeaders(req);
      const data = await services.lineItem.deleteCartItem(lineItemId as string, token as string);
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
