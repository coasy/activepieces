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
    eventCategoryId: Property.ShortText({
      displayName: 'Category ID',
      description: 'ID of category',
      required: true,
    }),
  },
  run: (configValue) => runCoasyAction(configValue, name),
});
