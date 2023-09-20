import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { getOrderStatusByReferenceNumber } from '../api/PromoStandard';
import { errorHandler, generateOrderStatusSpeechText } from './helper';
import { OrderStatusForAlexa } from '../api/interface';

export const OrderStatusByIdRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'OrderStatusById';
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    if (!('intent' in handlerInput.requestEnvelope.request)) {
      return errorHandler(handlerInput, 'No intent in request');
    }

    const slots = handlerInput.requestEnvelope.request.intent.slots;
    console.log('====== slots ======', slots);
    const referenceNumber = slots && slots.referenceNumber && slots.referenceNumber.value;

    if (!referenceNumber) return errorHandler(handlerInput, 'No referenceNumber in request');

    let orderStatus: OrderStatusForAlexa;
    try {
      orderStatus = await getOrderStatusByReferenceNumber(referenceNumber);
    } catch (err) {
      return errorHandler(handlerInput, err);
    }

    const speechText = generateOrderStatusSpeechText(referenceNumber, orderStatus);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Order Status', speechText)
      .getResponse();
  },
};
