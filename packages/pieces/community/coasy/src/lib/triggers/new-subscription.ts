import { createTrigger, Property, TriggerStrategy } from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import { createCoasyTrigger, destroyCoasyTrigger, testCoasyTrigger } from '../common/triggers';

const triggerName = "NEW_SUBSCRIPTION";

export const newSubscription = createTrigger({
  auth: coasyAuth,
  name: 'newSubscription',
  displayName: 'New Subscription',
  description: 'Triggers when a new subscription is created.',
  props: {},
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
