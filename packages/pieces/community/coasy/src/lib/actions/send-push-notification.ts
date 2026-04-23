import { createAction, Property } from '@activepieces/pieces-framework';
import { coasyAuth } from '../../index';
import { runCoasyAction } from '../common/actions';

const name = 'sendPushNotification';

export const sendPushNotification = createAction({
  auth: coasyAuth,
  name,
  displayName: 'Send Push Notification',
  description: 'Queues a push notification to all active devices of a user',
  props: {
    userId: Property.ShortText({
      displayName: 'User ID',
      description: 'Coasy user ID to deliver the notification to',
      required: true,
    }),
    title: Property.ShortText({
      displayName: 'Title',
      description: 'Notification title shown on the device',
      required: true,
    }),
    body: Property.LongText({
      displayName: 'Body',
      description: 'Notification body text shown on the device',
      required: true,
    }),
    topic: Property.StaticDropdown({
      displayName: 'Topic',
      description: 'Optional topic tag for categorising the notification',
      required: false,
      options: {
        options: [
          { label: 'Community', value: 'COMMUNITY' },
          { label: 'Chat', value: 'CHAT' },
          { label: 'Friendship', value: 'FRIENDSHIP' },
          { label: 'Challenge', value: 'CHALLENGE' },
          { label: 'Event', value: 'EVENT' },
          { label: 'Meditations', value: 'MEDITATIONS' },
        ],
      },
    }),
    url: Property.ShortText({
      displayName: 'URL',
      description: 'Optional deep link opened when the notification is tapped',
      required: false,
    }),
    threadId: Property.ShortText({
      displayName: 'Thread ID',
      description: 'Optional thread identifier for grouping notifications on iOS',
      required: false,
    }),
    data: Property.Object({
      displayName: 'Data',
      description: 'Optional custom payload forwarded to the app',
      required: false,
    }),
    delay: Property.Number({
      displayName: 'Delay (seconds)',
      description: 'Optional delay in seconds before the notification is sent',
      required: false,
    }),
  },
  run: (configValue) => runCoasyAction(configValue, name),
});
