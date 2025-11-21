import { createAction, Property } from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import { runCoasyAction } from '../common/actions';

const name = 'findEvent';

export const findEvent = createAction({
  auth: coasyAuth,
  name,
  displayName: 'Find Event',
  description: 'Finds Event',
  props: {
    title: Property.ShortText({
      displayName: 'Title',
      description: 'Title Name',
      required: false,
    }),
  },
  run: (configValue) => runCoasyAction(configValue, name),
});
