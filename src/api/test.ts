import { getOpenOrders, getOrderStatusByReferenceNumber } from './PromoStandard';

getOrderStatusByReferenceNumber('RBK001')
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

getOpenOrders()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
