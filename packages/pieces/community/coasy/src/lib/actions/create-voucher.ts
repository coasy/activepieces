import { createAction, Property } from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import { runCoasyAction } from '../common/actions';

const name = 'createVoucher';

export const createVoucher = createAction({
  auth: coasyAuth,
  name,
  displayName: 'Create Voucher',
  description: 'Creates a new voucher',
  props: {
    offerIds: Property.Array({
      displayName: 'Offer ID',
      description: 'ID of offer',
      required: false,
    }),
    countLeft: Property.Number({
      displayName: 'Quantity',
      description: 'Count of vouchers',
      required: false,
    }),
    recurringPeriod: Property.StaticDropdown({
      displayName: 'Recurring period',
      description: 'How the voucher will recurre',
      required: false,
      options: {
        options: [
          {
            label: 'Monthly',
            value: 'MONTHLY',
          },
          {
            label: 'Quarterly',
            value: 'QUARTERLY',
          },
          {
            label: 'Yearly',
            value: 'YEARLY',
          },
        ],
      },
    }),
  },
  run: (configValue) => runCoasyAction(configValue, name),
});
