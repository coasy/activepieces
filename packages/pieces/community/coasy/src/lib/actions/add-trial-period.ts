import { createAction, Property } from '@activepieces/pieces-framework';
import { coasyAuth } from '../../index';
import { runCoasyAction } from '../common/actions';

const name = 'addTrialPeriod';

// Reshapes flat guard props into the nested `guards: { ... }` body the server
// expects. `guardSources` maps a prop name to its server guard key (e.g.
// `{ funnelGuard: 'funnel' }`). Blank entries are dropped and `guards` is omitted
// when no guard has any value.
const buildGuardedRequest = (
  request: Record<string, unknown>,
  guardSources: Record<string, string>
): Record<string, unknown> => {
  const rest = { ...request };
  const guards: Record<string, unknown> = {};

  for (const [propName, guardKey] of Object.entries(guardSources)) {
    const value = rest[propName];
    delete rest[propName];
    const ids = Array.isArray(value)
      ? value.filter((id) => typeof id === 'string' && id.trim() !== '')
      : [];
    if (ids.length > 0) {
      guards[guardKey] = ids;
    }
  }

  return Object.keys(guards).length > 0 ? { ...rest, guards } : rest;
};

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
    funnelGuard: Property.Array({
      displayName: 'Funnel Guard',
      description:
        'Guards against extending the trial period if the user is already a funnel participant in one of these funnels.',
      required: false,
    }),
  },
  run: (configValue) =>
    runCoasyAction(
      configValue,
      name,
      buildGuardedRequest(configValue.propsValue, { funnelGuard: 'funnel' })
    ),
});
