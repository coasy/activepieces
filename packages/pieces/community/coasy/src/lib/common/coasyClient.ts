import {
  AuthenticationType,
  httpClient,
  HttpMethod,
  HttpRequest,
} from '@activepieces/pieces-common';

export type CoasyAuth = {
  baseUrl?: string;
  apiKey: string;
};

export const DEFAULT_BASE_URL = 'https://backend.api.prod.coasy.io';

export class CoasyClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async action(actionName: string, request: any) {
    return this.request(`/apps/actions/${actionName}`, request);
  }

  async createTrigger(trigger: string, hookUrl: string, filter: any) {
    return this.request(`/apps/triggers/create`, {
      hookUrl,
      trigger,
      filter,
    });
  }

  async destroyTrigger(webhookId: string) {
    return this.request(`/apps/triggers/destroy`, { webhookId });
  }

  async pollTriggerExample(trigger: string) {
    return this.request(`/apps/triggerExample`, {
      trigger,
    });
  }

  async request(path: string, requestBody: any) {
    const request: HttpRequest<string> = {
      method: HttpMethod.POST,
      url: `${this.baseUrl}${path}`,
      body: JSON.stringify(requestBody),
      authentication: {
        type: AuthenticationType.BEARER_TOKEN,
        token: this.apiKey,
      },
    };

    const response = await httpClient.sendRequest(request);

    if (response.status !== 200) {
      throw new Error(`Failed to communicate with Mailjet`);
    } else {
      return response.body;
    }
  }
}

export const createCoasyClient = (auth: CoasyAuth) =>
  new CoasyClient(auth.baseUrl ?? DEFAULT_BASE_URL, auth.apiKey);
