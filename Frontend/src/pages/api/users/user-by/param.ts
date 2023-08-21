import services from 'services/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromHeaders } from 'utils/auth-utils';
import { Searchable } from 'ordercloud-javascript-sdk';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const token = getTokenFromHeaders(req);
      const data = await services.users.getUserByParam(
        String(req.query.search),
        req.query.param as Searchable<'Users.List'>[number],
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
