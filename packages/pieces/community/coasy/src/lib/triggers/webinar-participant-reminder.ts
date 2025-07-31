import { createTrigger, Property, TriggerStrategy } from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import { createCoasyTrigger, destroyCoasyTrigger, testCoasyTrigger } from '../common/triggers';

const triggerName = "WEBINAR_PARTICIPANT_REMINDER";

export const webinarParticipantReminder = createTrigger({
  auth: coasyAuth,
  name: 'webinarParticipantReminder',
  displayName: 'Webinar Participant Reminder',
  description: 'Triggers when a webinar participant is reminded',
  props: {
    webinarIds: Property.Array({
      displayName: 'Webinar IDs',
      description: 'IDs of webinar to react to',
      required: false
    }),
    status: Property.StaticDropdown({
      displayName: 'Status',
      description: 'filter only participants by',
      required: false,
      options: {
        options: [
          {
            label: 'Upcoming',
            value: 'UPCOMING'
          },
          {
            label: 'Attented',
            value: 'ATTENTED'
          },
          {
            label: 'Not Attented',
            value: 'NOT_ATTENTED'
          }
        ]
      }
    })
  },
  sampleData: {},
  type: TriggerStrategy.WEBHOOK,
  onEnable: (context) => createCoasyTrigger({
    triggerName,
    webhookUrl: context.webhookUrl,
    auth: context.auth,
    filter: context.propsValue,
    store: context.store
  }),
  onDisable: (context) => destroyCoasyTrigger({
    triggerName,
    auth: context.auth,
    store: context.store
  }),
  test: (context) => testCoasyTrigger({
    triggerName,
    auth: context.auth
  }),
  async run(context) {
    return [context.payload.body];
  }
});
