import { SkillBuilders } from 'ask-sdk-core';

import { LaunchRequestHandler } from './alexa/LaunchRequestHandler';
import { AskOrderStatusRequestHandler } from './alexa/AskOrderStatusRequestHandler';
import { AlexaErrorHandler } from './alexa/ErrorHandler';
import { HelpIntentHandler } from './alexa/HelpIntentHandler';
import { CancelAndStopIntentHandler } from './alexa/CancelAndStopIntentHandler';
import { SessionEndedRequestHandler } from './alexa/SessionEndHandler';

let skill;

exports.handler = async function (event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);

  if (!skill) {
    skill = SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        AskOrderStatusRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(AlexaErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};
