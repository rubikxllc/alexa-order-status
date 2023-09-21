import { OrderStatusForAlexa } from './interface';
import { mapOrderStatus, post } from './utils';

export const getOpenOrders = async (): Promise<OrderStatusForAlexa[]> => {
  const res = await post(4);
  if (res.errorMessage) {
    throw res.errorMessage;
  }
  return mapOrderStatus(res.OrderStatusArray);
};

export const getOrderStatusByReferenceNumber = async (
  referenceNumber: string,
): Promise<OrderStatusForAlexa> => {
  const res = await post(1, referenceNumber);
  return mapOrderStatus(res.OrderStatusArray)[0];
};
