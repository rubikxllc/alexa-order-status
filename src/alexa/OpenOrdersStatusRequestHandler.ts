import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { getOpenOrders } from '../api/PromoStandard';
import { errorHandler } from './helper';

export const OpenOrdersStatusRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'OpenOrderStatus';
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    let orderStatus, speechText: string, title: string;

    try {
      orderStatus = await getOpenOrders();
    } catch (err) {
      return errorHandler(handlerInput, err);
    }

    speechText = `You have ${orderStatus} open orders.`;
    title = 'Order Status';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(title, speechText)
      .getResponse();
  },
};
