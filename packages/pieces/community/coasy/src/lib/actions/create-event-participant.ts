import { createAction, Property } from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import { runCoasyAction } from '../common/actions';

const name = 'createEventParticipant';

export const createEventParticipant = createAction({
  auth: coasyAuth,
  name,
  displayName: 'Create Event Participant',
  description: 'Creates a new event participant',
  props: {
    eventId: Property.ShortText({
      displayName: 'Event ID',
      description: 'ID of event',
      required: true,
    }),
    customerId: Property.ShortText({
      displayName: 'Customer ID',
      description: 'ID of customer',
      required: true,
    }),
    contact: Property.Object({
      displayName: 'Contact',
      description: 'Contact object keys: firstName',
      required: true,
      defaultValue: {
        firstName: '',
      },
    }),
    eventCategoryId: Property.ShortText({
      displayName: 'Category ID',
      description: 'ID of category',
      required: true,
    }),
    price: Property.Object({
      displayName: 'Price',
      description:
        'Price object keys: grossMicros, netMicros, vatRateMicros, vatCountry',
      required: false,
      defaultValue: {},
    }),
  },
  run: (configValue) => runCoasyAction(configValue, name),
});
