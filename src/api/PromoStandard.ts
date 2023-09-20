import axios from 'axios';
import { Builder, parseStringPromise } from 'xml2js';

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

  const obj = {
    'soapenv:Envelope': {
      $: {
        'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
        'xmlns:ns': 'http://www.promostandards.org/WSDL/OrderStatusService/1.0.0/',
      },
      'soapenv:Header': {},
      'soapenv:Body': {
        'ns:GetOrderStatusDetailsRequest': {
          'ns:wsVersion': '1.0.0',
          'ns:id': username,
          'ns:password': password,
          'ns:queryType': queryType,
          'ns:referenceNumber': referenceNumber,
          'ns:statusTimeStamp': statusTimeStamp,
        },
      },
    },
  };

  const builder = new Builder({ headless: true });
  return builder.buildObject(obj);
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
    return await parseStringPromise(res.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getOpenOrders = async (): Promise<OrderStatusForAlexa[]> => {
  const res = await post(4);
  console.log('======= promo parsed res =======', res);
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
