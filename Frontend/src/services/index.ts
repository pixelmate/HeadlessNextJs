import { Configuration } from 'ordercloud-javascript-sdk';
import { getEnv } from 'src/config/get-env';
import * as auth from './auth.service';
import * as me from './me.service';
import * as cart from './cart.service';
import * as lineItem from './lineItem.service';
import * as order from './order.service';
import * as spendingAccounts from './spending-accounts.service';
import * as users from './users.service';
import * as product from './products.service';

class OrderCloudService {
  auth: typeof auth;
  me: typeof me;
  cart: typeof cart;
  lineItem: typeof lineItem;
  order: typeof order;
  spendingAccounts: typeof spendingAccounts;
  users: typeof users;
  product: typeof product;

  constructor() {
    Configuration.Set({
      baseApiUrl: getEnv('NEXT_PUBLIC_ORDERCLOUD_API_ENDPOINT') as string,
    });

    this.auth = auth;
    this.me = me;
    this.cart = cart;
    this.lineItem = lineItem;
    this.order = order;
    this.spendingAccounts = spendingAccounts;
    this.users = users;
    this.product = product;
  }
}

const OrderCloudServiceInstance = new OrderCloudService();
export default OrderCloudServiceInstance;
