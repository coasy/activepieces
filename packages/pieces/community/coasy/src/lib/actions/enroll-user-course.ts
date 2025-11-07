import { createAction, Property } from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import { runCoasyAction } from '../common/actions';

const name = 'enrollUserCourse';

export const enrollUserCourse = createAction({
  auth: coasyAuth,
  name,
  displayName: 'Enroll User Course',
  description: 'Enrolls user course',
  props: {
    userId: Property.ShortText({
      displayName: 'User ID',
      description: 'ID of User',
      required: true,
    }),
    courseId: Property.ShortText({
      displayName: 'Course ID',
      description: 'ID of Course',
      required: true,
    }),
  },
  run: (configValue) => runCoasyAction(configValue, name),
});
