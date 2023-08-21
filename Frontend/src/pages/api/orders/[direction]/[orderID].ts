import services from 'services/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromHeaders } from 'utils/auth-utils';
import { OrderDirection } from 'ordercloud-javascript-sdk';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { direction, orderID } = req?.query || {};
  switch (req.method) {
    case 'GET': {
      const token = getTokenFromHeaders(req);
      const data = await services.order.getOrder(
        {
          direction: direction as OrderDirection,
          id: orderID as string,
        },
        token
      );
      res.status(200).json(data);
      break;
    }
    case 'PATCH': {
      const token = getTokenFromHeaders(req);
      const data = await services.order.patchShippingAddress(
        {
          direction: direction as OrderDirection,
          id: orderID as string,
          body: req.body,
        },
        token
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
