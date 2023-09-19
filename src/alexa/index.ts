import { Skill, SkillBuilders } from 'ask-sdk-core';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';

import { LaunchRequestHandler } from './LaunchRequestHandler';
import { AskOrderStatusRequestHandler } from './AskOrderStatusRequestHandler';
import { AlexaErrorHandler } from './ErrorHandler';
import { HelpIntentHandler } from './HelpIntentHandler';
import { CancelAndStopIntentHandler } from './CancelAndStopIntentHandler';
import { SessionEndedRequestHandler } from './SessionEndHandler';

export class AlexaSkill {
  private skill: Skill;

  constructor() {
    this.skill = SkillBuilders.custom()
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

  public async invoke(event: RequestEnvelope, context: any): Promise<ResponseEnvelope> {
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    const response = await this.skill.invoke(event, context);
    console.log(`RESPONSE++++${JSON.stringify(response)}`);

    return response;
  }
}
