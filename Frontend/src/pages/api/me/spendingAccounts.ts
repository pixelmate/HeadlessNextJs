import type { NextApiRequest, NextApiResponse } from 'next';
import services from 'services/index';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const data = await services.me.getGiftCards();
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
