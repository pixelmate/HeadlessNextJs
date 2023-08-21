import type { NextApiRequest, NextApiResponse } from 'next';
import { getWarehouseLocations } from 'services/warehouse.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const data = await getWarehouseLocations();
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
