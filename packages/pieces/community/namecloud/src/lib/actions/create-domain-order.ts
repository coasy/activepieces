import { createAction, Property } from '@activepieces/pieces-framework';
import { namecloudAuth } from '../..';
import { httpClient, HttpMethod, HttpRequest } from '@activepieces/pieces-common';

export const createDomainOrder = createAction({
  auth: namecloudAuth,
  name: 'createDomainOrder',
  displayName: 'Create Domain Order',
  description: 'Create a domain order',
  props: {
    domain: Property.ShortText({
      displayName: 'Domain',
      description: '',
      required: true
    }),
    type: Property.StaticDropdown({
      displayName: 'Domain',
      description: '',
      required: true,
      options: {
        options: [{
          label: "Auth Info",
          value: "AUTHINFO"
        }]
      }
    })
  },
  async run(context) {
    const { propsValue, auth } = context;
    const requestBody = {
      token: auth,
      domain: propsValue.domain,
      type: propsValue.type
    };
    const request: HttpRequest<string> = {
      method: HttpMethod.POST,
      url: `https://api.namecloud.io/v1/domain-orders/create`,
      body: JSON.stringify(requestBody),
    };

    const response = await httpClient.sendRequest(request);

    if (response.status !== 200) {
      throw new Error(`Failed to communicate with Mailjet`);
    } else {
      return response.body.data
    }
  },
});
