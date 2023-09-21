export enum EOrderStatus {
  Received = 'Received',
  Confirmed = 'Confirmed',
  Preproduction = 'Preproduction',
  InProduction = 'InProduction',
  inStorage = 'InStorage',
  partiallyShipped = 'PartiallyShipped',
  Shipped = 'Shipped',
  Complete = 'Complete',
  Cancelled = 'Cancelled',
}

export interface IOrderStatusRequest {
  username: string;
  password: string;
  queryType: number; // 1 = PO Search, 2 = SO Search, 3 = Last Update Search, 4 = All Open Search
  referenceNumber?: string; // Only required for 1,2
  statusTimeStamp?: string; // Only required for 3
}
export interface PSResponse {
  Envelope: Envelope;
}

export interface Envelope {
  Body: Body;
}

export interface Body {
  GetOrderStatusDetailsResponse: GetOrderStatusDetailsResponse;
}

export interface GetOrderStatusDetailsResponse {
  OrderStatusArray: OrderStatus[];
  errorMessage?: string;
}

export interface OrderStatus {
  purchaseOrderNumber: string;
  OrderStatusDetailArray: OrderStatusDetail[];
}

export interface OrderStatusDetail {
  factoryOrderNumber: string;
  statusID: number;
  statusName: EOrderStatus;
  expectedShipDate: Date;
  expectedDeliveryDate: Date;
  responseRequired: boolean;
  validTimestamp: Date;
}

export interface OrderStatusForAlexa {
  statusName: EOrderStatus;
  expectedShipDate: Date;
  expectedDeliveryDate: Date;
  purchaseOrderNumber: string;
}

export type IOrderStatusResponse = OrderStatusForAlexa[] | string;
