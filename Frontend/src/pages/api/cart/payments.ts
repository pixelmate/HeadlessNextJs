import services from 'services/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromHeaders } from 'utils/auth-utils';
import { mapPromoCodes } from 'src/schemas/spending-accounts';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const token = getTokenFromHeaders(req);
      const paymentsData = await services.cart.getPayments(token as string);
      const spendingAccountsData = await services.spendingAccounts.getSpendingAccountsByIds(
        paymentsData?.Items?.map((item) => item?.SpendingAccountID) || [],
        token
      );
      const data = mapPromoCodes(paymentsData.Items, spendingAccountsData);
      res.status(200).json(data);
      break;
    }
    case 'POST': {
      const token = getTokenFromHeaders(req);
      const data = await services.cart.addPayment(req.body, token as string);
      res.status(200).json(data);
      break;
    }
    default:
      res.send(404);
      break;
  }
};

export default handler;
