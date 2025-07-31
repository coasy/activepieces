import { createTrigger, Property, TriggerStrategy } from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import { createCoasyTrigger, destroyCoasyTrigger, testCoasyTrigger } from '../common/triggers';

const triggerName = "NEW_ORDER_ITEM";

export const newOrderItem = createTrigger({
  auth: coasyAuth,
  name: 'newOrderItem',
  displayName: 'New Order Item',
  description: 'Triggers for each item in a new Order.',
  props: {
    offerIds: Property.Array({
      displayName: 'Offer IDs',
      description: 'IDs of offer to react to',
      required: false
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
