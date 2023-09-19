import { RequestEnvelope } from 'ask-sdk-model';
import { AlexaSkill } from './alexa';

exports.handler = async function (event: RequestEnvelope, context: any) {
  const skill = new AlexaSkill();
  console.log('========= Alexa Skill ========');
  return await skill.invoke(event, context);
};
