import { createAction, Property } from "@activepieces/pieces-framework";
import { coasyAuth } from "../..";
import { CoasyClient } from "../common/coasyClient";

export const createVoucher = createAction({
  auth: coasyAuth,
  name: "createVoucher",
  displayName: "Create Voucher",
  description: "Creates a new voucher",
  props: {
    offerId: Property.ShortText({
      displayName: "Offer ID",
      description: "ID of offer",
      required: true
    })
  },
  async run(configValue) {
    const { propsValue, auth } = configValue;
    const client = new CoasyClient(
      auth.baseUrl ?? "https://backend.api.prod.coasy.io",
      auth.apiKey
    );
    const request = {
      offerId: propsValue.offerId
    };
    return client.action("createVoucher", request);
  }
});
