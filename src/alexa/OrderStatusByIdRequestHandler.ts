import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { getOrderStatusByReferenceNumber } from '../api/PromoStandard';
import { errorHandler } from './helper';

export const OrderStatusByIdRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'OrderStatusById';
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    let orderStatus, speechText: string, title: string;

    if (!('intent' in handlerInput.requestEnvelope.request)) {
      return errorHandler(handlerInput, 'No intent in request');
    }

    const slots = handlerInput.requestEnvelope.request.intent.slots;
    const referenceNumber = slots && slots.referenceNumber && slots.referenceNumber.value;

    if (!referenceNumber) return errorHandler(handlerInput, 'No referenceNumber in request');

    try {
      orderStatus = await getOrderStatusByReferenceNumber(referenceNumber);
    } catch (err) {
      return errorHandler(handlerInput, err);
    }

    speechText = `Your order with reference number ${referenceNumber} has been ${orderStatus}`;
    title = 'Order Status';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(title, speechText)
      .getResponse();
  },
};
