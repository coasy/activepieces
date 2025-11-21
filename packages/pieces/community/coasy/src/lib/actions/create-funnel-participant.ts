import { createAction, Property } from '@activepieces/pieces-framework';
import { coasyAuth } from '../../index';
import { runCoasyAction } from '../common/actions';

const name = 'createFunnelParticipant';

export const createFunnelParticipant = createAction({
  auth: coasyAuth,
  name,
  displayName: 'Create Funnel Participant',
  description: 'Create a new funnel participant',
  props: {
    funnelId: Property.ShortText({
      displayName: 'Funnel ID',
      description: 'ID of funnel',
      required: true,
    }),
    firstName: Property.ShortText({
      displayName: 'First name',
      description: 'first name of participant',
      required: true,
    }),
    lastName: Property.ShortText({
      displayName: 'Last name',
      description: 'last name of participant',
      required: false,
    }),
    email: Property.ShortText({
      displayName: 'Email',
      description: 'email address of partipant',
      required: true,
    }),
  },
  run: (configValue) => runCoasyAction(configValue, name),
});
