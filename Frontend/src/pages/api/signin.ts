import services from 'services/index';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      const signIn = req.body.username ? services.auth.signIn : services.auth.anonymousSignIn;
      const data = await signIn(req.body);
      res.status(data.status).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
