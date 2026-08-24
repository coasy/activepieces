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
    directGrant: Property.Checkbox({
      displayName: 'Direct Grant Course',
      description:
        'Also grants the course to the user. Without it the enrollment is only progress tracking and the course stays locked.',
      required: false,
      defaultValue: true,
    }),
  },
  run: (configValue) => runCoasyAction(configValue, name),
});
