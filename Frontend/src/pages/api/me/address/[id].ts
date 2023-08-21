import type { NextApiRequest, NextApiResponse } from 'next';
import services from 'services/index';
import { getTokenFromHeaders } from 'utils/auth-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  switch (req.method) {
    case 'PATCH': {
      const token = getTokenFromHeaders(req);
      const data = await services.me.updateShippingAddress((id as string) || '', req.body, token);
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
