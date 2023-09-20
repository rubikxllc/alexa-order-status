import axios from 'axios';

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

interface IOrderStatusRequest {
  username: string;
  password: string;
  queryType: number; // 1 = PO Search, 2 = SO Search, 3 = Last Update Search, 4 = All Open Search
  referenceNumber: string; // Only required for 1,2
  statusTimeStamp: string; // Only required for 3
}

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

export const getOrderStatus = async (): Promise<IOrderStatus> => {
  const params: IOrderStatusRequest = {
    username: '',
    password: '',
    queryType: 4,
    referenceNumber: '',
    statusTimeStamp: '',
  };

  const endpoint = '';

  try {
    const res = await axios.post(endpoint, xmls(params), {
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: 'getOrderStatusDetails',
      },
    });
    console.log(res);
    return {
      orderStatus: res.data,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
