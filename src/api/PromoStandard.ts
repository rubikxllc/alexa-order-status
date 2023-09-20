import axios from 'axios';
import { toJson } from 'xml2json';

import {
  IOrderStatusRequest,
  OrderStatus,
  OrderStatusDetail,
  OrderStatusForAlexa,
  PSResponse,
} from './interface';

const username = 'ps3553427';
const password = 'v5PG6x7S';
const endpoint = 'https://devservices.alphabroder.com/orderStatus-1-0/service/index.php';

const xmls = (param: IOrderStatusRequest) => {
  const { username, password, queryType, referenceNumber, statusTimeStamp } = param;
  return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.promostandards.org/WSDL/OrderStatusService/1.0.0/">
      <soapenv:Header/>
      <soapenv:Body>
        <ns:GetOrderStatusDetailsRequest>
          <ns:wsVersion>1.0.0</ns:wsVersion>
          <ns:id>${username}</ns:id>
          <ns:password>${password}</ns:password>
          <ns:queryType>${queryType}</ns:queryType>
          <ns:referenceNumber>${referenceNumber}</ns:referenceNumber>
          <ns:statusTimeStamp>${statusTimeStamp}</ns:statusTimeStamp>
        </ns:GetOrderStatusDetailsRequest>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
};

const post = async (queryType: number, referenceNumber?: string): Promise<PSResponse> => {
  const params: IOrderStatusRequest = {
    username,
    password,
    queryType,
    referenceNumber,
  };

  try {
    const res = await axios.post(endpoint, xmls(params), {
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: 'getOrderStatusDetails',
      },
    });

    return toJson(res.data, { object: true }) as unknown as PSResponse;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getOpenOrders = async (): Promise<OrderStatusForAlexa[]> => {
  const res = await post(4);
  console.log('======= promo res =======', res);
  return mapOrderStatus(res.Envelope.Body.GetOrderStatusDetailsResponse.OrderStatusArray);
};

export const getOrderStatusByReferenceNumber = async (
  referenceNumber: string,
): Promise<OrderStatusForAlexa> => {
  const res = await post(1, referenceNumber);
  console.log('======= promo res =======', res);
  return mapOrderStatus(res.Envelope.Body.GetOrderStatusDetailsResponse.OrderStatusArray)[0];
};

const mapOrderStatus = (OrderStatusArray: OrderStatus[]): OrderStatusForAlexa[] =>
  OrderStatusArray.map((orderStatus: OrderStatus) => {
    const orderStatusDetail: OrderStatusDetail = orderStatus.OrderStatusDetailArray[0];

    console.log(
      `'======= orderStatusDetail ======= for ${orderStatus.purchaseOrderNumber}`,
      orderStatusDetail,
    );

    return {
      statusName: orderStatusDetail.statusName,
      expectedShipDate: orderStatusDetail.expectedShipDate,
      expectedDeliveryDate: orderStatusDetail.expectedDeliveryDate,
      purchaseOrderNumber: orderStatus.purchaseOrderNumber,
    };
  });
