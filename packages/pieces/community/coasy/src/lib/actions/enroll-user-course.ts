import { createAction, Property } from "@activepieces/pieces-framework";
import { coasyAuth } from "../..";
import { CoasyClient } from "../common/coasyClient";

export const enrollUserCourse = createAction({
  auth: coasyAuth,
  name: "enrollUserCourse",
  displayName: "Enroll User Course",
  description: "Enrolls user course",
  props: {
    userId: Property.ShortText({
      displayName: "User ID",
      description: "ID of User",
      required: true
    }),
    courseId: Property.ShortText({
      displayName: "Course ID",
      description: "ID of Course",
      required: true
    }),
    directGrant: Property.Checkbox({
      displayName: "Direct Grant",
      description: "Give direct grant",
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
      userId: propsValue.userId,
      courseId: propsValue.courseId,
      directGrant: propsValue.directGrant
    };
    return client.action("enrollUserCourse", request);
  }
});
