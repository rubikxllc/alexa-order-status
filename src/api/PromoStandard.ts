const url = process.env.PROMOSTANDARDS_URL;
const account = process.env.PROMOSTANDARDS_ACCOUNT;
const secret = process.env.PROMOSTANDARDS_SECRET;

export enum OrderStatus {
  Received = 'received',
  Confirmed = 'confirmed',
  Preproduction = 'preproduction',
  InProduction = 'inProduction',
  inStorage = 'inStorage',
  partiallyShipped = 'partiallyShipped',
  Shipped = 'shipped',
  Complete = 'complete',
  Cancelled = 'cancelled',
}
export interface IOrderStatus {
  orderStatus: OrderStatus;
}

export const getOrderStatus = async (): Promise<IOrderStatus> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        orderStatus: OrderStatus.Received,
      });
    }, 1000);
  });
};
