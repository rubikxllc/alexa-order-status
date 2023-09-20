import { HandlerInput } from 'ask-sdk-core';

export const errorHandler = (handlerInput: HandlerInput, error: any) => {
  console.error(error);
  const errorText = 'Sorry, there is something wrong with PrompStandards. Please try again later.';
  return handlerInput.responseBuilder
    .speak(errorText)
    .withSimpleCard('Error', errorText)
    .getResponse();
};
