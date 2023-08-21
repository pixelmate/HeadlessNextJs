import type { NextApiRequest, NextApiResponse } from 'next';
import { getRegionCodes } from 'services/regionCodes.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const data = await getRegionCodes();
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
