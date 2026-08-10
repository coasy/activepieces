import {
  ActionContext,
  InputPropertyMap,
} from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import { createCoasyClient } from './coasyClient';

export const runCoasyAction = async <T extends InputPropertyMap>(
  configValue: ActionContext<typeof coasyAuth, T>,
  action: string,
  request?: Record<string, unknown>
) => {
  const { propsValue, auth: authPayload } = configValue;
  const client = createCoasyClient(authPayload);

  const body = { ...(request ?? propsValue) };
  delete body['auth'];

  return client.action(action, body);
};
