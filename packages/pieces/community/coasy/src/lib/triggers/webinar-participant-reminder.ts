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

const triggerName = 'WEBINAR_PARTICIPANT_REMINDER';

export const webinarParticipantReminder = createTrigger({
  auth: coasyAuth,
  name: 'webinarParticipantReminder',
  displayName: 'Webinar Participant Reminder',
  description: 'Triggers when a webinar participant is reminded',
  props: {
    webinarIds: Property.Array({
      displayName: 'Webinar IDs',
      description: 'IDs of webinar to react to',
      required: false,
    }),
    selectedStartType: Property.StaticDropdown({
      displayName: 'Selected start type',
      description: 'Filter participants based on the start type',
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
    status: Property.StaticDropdown({
      displayName: 'Selected start type',
      description: 'Webinar start status',
      required: false,
      options: {
        options: [
          {
            label: 'Starting',
            value: 'STARTING',
          },
          {
            label: 'Started',
            value: 'STARTED',
          },
          {
            label: '15 Minutes Before',
            value: '15_MINUTES_BEFORE',
          },
          {
            label: '1 Hour Before',
            value: '1_HOUR_BEFORE',
          },
          {
            label: '3 Hours Before',
            value: '3_HOURS_BEFORE',
          },
          {
            label: '24 Hours Before',
            value: '24_HOURS_BEFORE',
          },
          {
            label: '3 Days Before',
            value: '3_DAYS_BEFORE',
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
