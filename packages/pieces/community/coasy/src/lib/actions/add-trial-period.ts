import { createAction, Property } from '@activepieces/pieces-framework';
import { coasyAuth } from '../../index';
import { runCoasyAction } from '../common/actions';

const name = 'addTrialPeriod';

export const addTrialPeriod = createAction({
  auth: coasyAuth,
  name,
  displayName: 'Add Trial Period',
  description:
    "Grants a trial period on an offer to the user identified by email. Extends an existing COASY-managed subscription's nextDue or creates a new pre-cancelled subscription that auto-terminates at nextDue.",
  props: {
    email: Property.ShortText({
      displayName: 'Email',
      description: "User's email. The user is created if it does not exist yet.",
      required: true,
    }),
    days: Property.Number({
      displayName: 'Trial Days',
      description: 'Number of trial days to grant. Must be a positive integer.',
      required: true,
    }),
    offerId: Property.ShortText({
      displayName: 'Offer ID',
      description: 'ID of the offer to grant the trial on. Must be PUBLISHED.',
      required: true,
    }),
    paymentPlanId: Property.ShortText({
      displayName: 'Payment Plan ID',
      description:
        "Optional specific payment plan inside the offer. Defaults to the offer's default plan.",
      required: false,
    }),
    firstName: Property.ShortText({
      displayName: 'First Name',
      description: 'Optional first name, forwarded when a new user is created.',
      required: false,
    }),
  },
  run: (configValue) => runCoasyAction(configValue, name),
});
