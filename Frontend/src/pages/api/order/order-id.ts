import type { NextApiRequest, NextApiResponse } from 'next';
import services from 'services/index';
import { setCookie } from 'cookies-next';
import { ORDER_ID } from 'config/index';
// TODO: Temporary solution for order id Will be changed when submit order will be implemented
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      const data = await services.order.getOrderId();
      setCookie(ORDER_ID, data, { req, res });
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
