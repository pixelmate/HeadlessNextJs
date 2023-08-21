//Mock API for Newsletter Subscription

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          email: req.body.email,
          status: true,
        });
      }, 5000);
    });
    res.status(200).json(response);
  }
}
