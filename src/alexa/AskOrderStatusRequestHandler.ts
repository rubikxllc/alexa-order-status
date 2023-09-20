import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import speech from './speech-text.json';
import { IOrderStatus, getOrderStatus } from '../api/PromoStandard';

export const AskOrderStatusRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    console.log('promo intent reached', request);
    return request.type === 'IntentRequest' && request.intent.name === 'PromoOrderStatus';
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    let orderStatus: IOrderStatus, speechText: string, title: string;

    try {
      orderStatus = await getOrderStatus();
    } catch (err) {
      console.error(err);
      speechText = speech.error;
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Error', speechText)
        .getResponse();
    }

    speechText = speech.orderStatus + orderStatus.orderStatus;
    title = 'Order Status';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(title, speechText)
      .getResponse();
  },
};
