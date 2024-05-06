import { createAction, Property } from '@activepieces/pieces-framework';
import { namecloudAuth } from '../..';
import { httpClient, HttpMethod, HttpRequest } from '@activepieces/pieces-common';

export const getDomainOrder = createAction({
  auth: namecloudAuth,
  name: 'getDomainOrder',
  displayName: 'Get Domain Order',
  description: 'Get a domain order by id',
  props: {
    orderId: Property.ShortText({
      displayName: 'Order ID',
      description: '',
      required: true
    })
  },
  async run(context) {
    const { propsValue, auth } = context;
    const requestBody = {
      token: auth,
      order_id: propsValue.orderId
    };
    const request: HttpRequest<string> = {
      method: HttpMethod.POST,
      url: `https://api.namecloud.io/v1/domain-orders/get`,
      body: JSON.stringify(requestBody),
    };

    const response = await httpClient.sendRequest(request);

    if (response.status !== 200) {
      throw new Error(`Failed to communicate with Mailjet`);
    } else {
      return response.body.data;
    }
  },
});
