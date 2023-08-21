import services from 'services/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromHeaders } from 'utils/auth-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const token = getTokenFromHeaders(req);
      const data = await services.users.getUserByXpProperty(
        String(req.query.value),
        String(req.query.property) as keyof UserXp,
        token
      );
      res.json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
