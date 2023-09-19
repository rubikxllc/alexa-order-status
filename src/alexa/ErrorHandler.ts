import { ErrorHandler } from 'ask-sdk-core';
export const AlexaErrorHandler: ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, I don't understand your command. Please say again!!!")
      .reprompt("Sorry, I don't understand your command.")
      .getResponse();
  },
};
