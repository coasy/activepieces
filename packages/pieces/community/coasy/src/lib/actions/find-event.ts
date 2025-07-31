import { createAction, Property } from "@activepieces/pieces-framework";
import { coasyAuth } from "../..";
import { CoasyClient } from "../common/coasyClient";

export const findEvent = createAction({
  auth: coasyAuth,
  name: "findEvent",
  displayName: "Find Event",
  description: "Finds Event",
  props: {
    title: Property.ShortText({
      displayName: "Title",
      description: "Title Name",
      required: false
    })
  },
  async run(configValue) {
    const { propsValue, auth } = configValue;
    const client = new CoasyClient(
      auth.baseUrl ?? "https://backend.api.prod.coasy.io",
      auth.apiKey
    );
    const request = {
      title: propsValue.title
    };
    return client.action("findEvent", request);
  }
});
