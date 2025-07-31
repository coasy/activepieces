import { createAction, Property } from "@activepieces/pieces-framework";
import { coasyAuth } from "../..";
import { CoasyClient } from "../common/coasyClient";

export const createEventParticipant = createAction({
  auth: coasyAuth,
  name: "createEventParticipant",
  displayName: "Create Event Participant",
  description: "Creates a new event participant",
  props: {
    eventId: Property.ShortText({
      displayName: "Event ID",
      description: "ID of event",
      required: true
    }),
    categoryId: Property.ShortText({
      displayName: "Category ID",
      description: "ID of category",
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
      eventId: propsValue.eventId,
      categoryId: propsValue.categoryId
    };
    return client.action("createEventParticipant", request);
  }
});
