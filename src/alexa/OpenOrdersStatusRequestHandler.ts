import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { getOpenOrders } from '../api/PromoStandard';
import { errorHandler } from './helper';
import { OrderStatusForAlexa } from '../api/interface';

export const OpenOrdersStatusRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'OpenOrderStatus';
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    let ordersStatus: OrderStatusForAlexa[] | string;
    try {
      ordersStatus = await getOpenOrders();
    } catch (err) {
      console.log(err);
      return errorHandler(handlerInput, err);
    }

    let speechText: string;

    if (typeof ordersStatus === 'string') {
      return handlerInput.responseBuilder
        .speak(ordersStatus)
        .withSimpleCard('Order Status', ordersStatus)
        .getResponse();
    }

    speechText = `You have ${ordersStatus.length} open orders.`;
    if (ordersStatus.length > 0) {
      speechText += `Their reference numbers are ${ordersStatus
        .map((orderStatus) => orderStatus.purchaseOrderNumber)
        .join(', ')}`;
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Order Status', speechText)
      .getResponse();
  },
};
