import type { NextApiRequest, NextApiResponse } from 'next';
import services from 'services/index';
import { getTokenFromHeaders } from 'utils/auth-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PATCH': {
      const token = getTokenFromHeaders(req) || '';
      const { orderId, giftOrderMessage, isGiftOrder } = req.body;
      const data = await services.order.patchGiftMessage(
        token,
        orderId,
        giftOrderMessage,
        isGiftOrder
      );
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
