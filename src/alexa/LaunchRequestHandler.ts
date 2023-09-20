import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(input: HandlerInput): Response {
    const speechText =
      'Welcome to Promo Order Status Tacker. You can ask me about your order status.';

    return input.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .reprompt(speechText)
      .withSimpleCard('Welcome to your Order Status', speechText)
      .getResponse();
  },
};
