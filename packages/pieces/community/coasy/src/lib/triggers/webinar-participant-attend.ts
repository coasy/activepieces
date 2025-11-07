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

const triggerName = 'WEBINAR_PARTICIPANT_ATTEND';

export const webinarParticipantAttend = createTrigger({
  auth: coasyAuth,
  name: 'webinarParticipantAttend',
  displayName: 'Webinar Participant Attend',
  description:
    'Triggers when a webinar participant has attended or not attended',
  props: {
    webinarIds: Property.Array({
      displayName: 'Webinar IDs',
      description: 'IDs of webinar to react to',
      required: false,
    }),
    selectedStartType: Property.StaticDropdown({
      displayName: 'Selected start type',
      description: 'filter only those participants',
      required: false,
      options: {
        options: [
          {
            label: 'Later',
            value: 'LATER',
          },
          {
            label: 'Instantly',
            value: 'INSTANTLY',
          },
        ],
      },
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
