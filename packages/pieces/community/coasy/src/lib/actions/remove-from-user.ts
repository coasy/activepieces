import { createAction, Property } from '@activepieces/pieces-framework';
import { coasyAuth } from '../..';
import { runCoasyAction } from '../common/actions';

const name = 'removeFromUser';

export const removeFromUser = createAction({
  auth: coasyAuth,
  name,
  displayName: 'Remove From User',
  description:
    'Removes features, community topics, community topic groups, or meditation categories from a user. Values the user does not have are ignored without raising an error',
  props: {
    userId: Property.ShortText({
      displayName: 'User ID',
      description: 'ID of User',
      required: true,
    }),
    features: Property.Array({
      displayName: 'Features',
      description: 'List of feature IDs to remove',
      required: false,
    }),
    communityTopics: Property.Array({
      displayName: 'Community Topics',
      description: 'List of community topic IDs to remove',
      required: false,
    }),
    communityTopicGroups: Property.Array({
      displayName: 'Community Topic Groups',
      description: 'List of community topic group IDs to remove',
      required: false,
    }),
    meditationCategories: Property.Array({
      displayName: 'Meditation Categories',
      description:
        'List of meditation category IDs to remove. The format is "libraryId/categoryId"',
      required: false,
    }),
  },
  run: (configValue) => runCoasyAction(configValue, name),
});
