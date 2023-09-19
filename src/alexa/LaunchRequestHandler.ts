import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(input: HandlerInput): Response {
    const speechText = 'Welcome to your SDK weather skill. Ask me the weather!';

    return input.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Welcome to your SDK weather skill. Ask me the weather!', speechText)
      .getResponse();
  },
};
