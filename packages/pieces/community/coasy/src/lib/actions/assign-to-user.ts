import { createAction, Property } from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import { runCoasyAction } from '../common/actions';

const name = 'assignToUser';

export const assignToUser = createAction({
  auth: coasyAuth,
  name,
  displayName: 'Assign To User',
  description:
    'Assigns features, community topics, community topic groups, or meditation categories to a user',
  props: {
    userId: Property.ShortText({
      displayName: 'User ID',
      description: 'ID of User',
      required: true,
    }),
    features: Property.Array({
      displayName: 'Features',
      description: 'List of feature IDs to assign',
      required: false,
    }),
    communityTopics: Property.Array({
      displayName: 'Community Topics',
      description: 'List of community topic IDs to assign',
      required: false,
    }),
    communityTopicGroups: Property.Array({
      displayName: 'Community Topic Groups',
      description: 'List of community topic group IDs to assign',
      required: false,
    }),
    meditationCategories: Property.Array({
      displayName: 'Meditation Categories',
      description:
        'List of meditation category IDs to assign. The format is "libraryId/categoryId"',
      required: false,
    }),
  },
  run: (configValue) => runCoasyAction(configValue, name),
});
