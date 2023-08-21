//Mock API for ContactUs

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: true,
          });
        }, 5000);
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(false);
    }
  }
}
