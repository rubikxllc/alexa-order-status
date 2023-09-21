import { HandlerInput } from 'ask-sdk-core';
import { OrderStatusForAlexa } from '../api/interface';

export const errorHandler = (handlerInput: HandlerInput, error: any) => {
  console.error('-------ERROR--------\n', error, '\n-------ERROR--------');
  const errorText = 'Sorry, there is something wrong with PrompStandards. Please try again later.';
  return handlerInput.responseBuilder
    .speak(errorText)
    .withSimpleCard('Error', errorText)
    .getResponse();
};

export const generateOrderStatusSpeechText = (
  referenceNumber: string,
  orderStatus: OrderStatusForAlexa,
): string => {
  const { statusName, expectedDeliveryDate, expectedShipDate } = orderStatus;
  let speechText = `The status of order ${referenceNumber} is ${statusName}`;
  if (expectedShipDate) {
    speechText += ` and is expected to ship on ${orderStatus.expectedShipDate}`;
  }
  if (expectedDeliveryDate) {
    speechText += ` and is expected to deliver on ${orderStatus.expectedDeliveryDate}`;
  }
  return speechText;
};
