import {
  createTrigger,
  Property,
  TriggerStrategy,
} from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import {
  createCoasyTrigger,
  destroyCoasyTrigger,
  testCoasyTrigger,
} from '../common/triggers';

const triggerName = 'QUIZ_PARTICIPANT_COMPLETED';

export const quizParticipantCompleted = createTrigger({
  auth: coasyAuth,
  name: 'quizParticipantCompleted',
  displayName: 'Quiz Participant Completed',
  description:
    'Triggers when a quiz participant finishes the quiz (includes answers and computed result)',
  props: {
    quizIds: Property.Array({
      displayName: 'Quiz IDs',
      description: 'IDs of quizzes to react to',
      required: false,
    }),
  },
  sampleData: {},
  type: TriggerStrategy.WEBHOOK,
  onEnable: (context) =>
    createCoasyTrigger({
      triggerName,
      webhookUrl: context.webhookUrl,
      auth: context.auth,
      filter: context.propsValue,
      store: context.store,
    }),
  onDisable: (context) =>
    destroyCoasyTrigger({
      triggerName,
      auth: context.auth,
      store: context.store,
    }),
  test: (context) =>
    testCoasyTrigger({
      triggerName,
      auth: context.auth,
    }),
  async run(context) {
    return [context.payload.body];
  },
});
