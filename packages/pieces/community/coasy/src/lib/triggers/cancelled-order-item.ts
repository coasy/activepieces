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

const triggerName = 'CANCELLED_ORDER_ITEM';

export const cancelledOrderItem = createTrigger({
  auth: coasyAuth,
  name: 'cancelledOrderItem',
  displayName: 'Cancelled Order Item',
  description: 'Triggers when an order item is cancelled.',
  props: {
    offerIds: Property.Array({
      displayName: 'Offer IDs',
      description: 'IDs of offers to react to',
      required: false,
    }),
    selectedPaymentPlans: Property.Array({
      displayName: 'Selected Payment Plans',
      description: 'Payment plans to filter by',
      required: false,
    }),
    selectedShippingOptions: Property.Array({
      displayName: 'Selected Shipping Options',
      description: 'Shipping options to filter by',
      required: false,
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
