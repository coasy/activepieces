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

const triggerName = 'CANCELLED_ORDER';

export const cancelledOrder = createTrigger({
  auth: coasyAuth,
  name: 'cancelledOrder',
  displayName: 'Cancelled Order',
  description: 'Triggers when an order is cancelled.',
  props: {},
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
