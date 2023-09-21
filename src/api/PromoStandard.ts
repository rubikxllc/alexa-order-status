import { IOrderStatusResponse, OrderStatusForAlexa } from './interface';
import { mapOrderStatus, post } from './utils';

export const getOpenOrders = async (): Promise<IOrderStatusResponse> => {
  const res = await post(4);
  if (res.errorMessage) return res.errorMessage;
  return mapOrderStatus(res.OrderStatusArray);
};

export const getOrderStatusByReferenceNumber = async (
  referenceNumber: string,
): Promise<IOrderStatusResponse> => {
  const res = await post(1, referenceNumber);
  if (res.errorMessage) return res.errorMessage;
  return mapOrderStatus(res.OrderStatusArray)[0];
};
