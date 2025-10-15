import {
  ActionContext,
  InputPropertyMap,
} from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import { CoasyClient } from './coasyClient';

export const runCoasyAction = async <T extends InputPropertyMap>(
  configValue: ActionContext<typeof coasyAuth, T>,
  action: string
) => {
  const { propsValue, auth: authPayload } = configValue;
  const client = new CoasyClient(
    authPayload.baseUrl ?? 'https://backend.api.prod.coasy.io',
    authPayload.apiKey
  );

  const { ...restPropsValue } = propsValue;

  delete restPropsValue['auth'];

  const request = { ...restPropsValue };
  return client.action(action, request);
};
