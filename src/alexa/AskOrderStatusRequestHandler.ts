import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import speech from './speech-text.json';
import { getOrderStatus } from '../api/PromoStandard';

export const AskOrderStatusRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'PromoOrderStatus';
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    const orderStatus = await getOrderStatus();
    const speechText = speech.orderStatus + orderStatus.orderStatus;
    const title = 'Order Status';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(title, speechText)
      .getResponse();
  },
};
