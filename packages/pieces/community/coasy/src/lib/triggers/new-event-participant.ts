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

const triggerName = 'NEW_EVENT_PARTICIPANT';

export const newEventParticipant = createTrigger({
  auth: coasyAuth,
  name: 'newEventParticipant',
  displayName: 'New Event Participant',
  description: 'Triggers when a new Event Participant is created.',
  props: {
    eventIds: Property.Array({
      displayName: 'Event IDs',
      description: 'IDs of events to react to',
      required: false,
    }),
    eventTypeIds: Property.Array({
      displayName: 'Event Type IDs',
      description: 'IDs of event types to react to',
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
