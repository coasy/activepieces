import {
  createPiece,
  PieceAuth,
  Property,
} from '@activepieces/pieces-framework';
import { createEventParticipant } from './lib/actions/create-event-participant';
import { createFunnelParticipant } from './lib/actions/create-funnel-participant';
import { createVoucher } from './lib/actions/create-voucher';
import { enrollUserCourse } from './lib/actions/enroll-user-course';
import { findEvent } from './lib/actions/find-event';
import { cancelledMembership } from './lib/triggers/cancelled-membership';
import { cancelledOrder } from './lib/triggers/cancelled-order';
import { cancelledOrderItem } from './lib/triggers/cancelled-order-item';
import { cancelledOrderprocess } from './lib/triggers/cancelled-orderprocess';
import { cancelledSubscription } from './lib/triggers/cancelled-subscription';
import { newAuthEvent } from './lib/triggers/new-auth-event';
import { newCustomer } from './lib/triggers/new-customer';
import { newFunnelParticipant } from './lib/triggers/new-funnel-participant';
import { newMembership } from './lib/triggers/new-membership';
import { newOrder } from './lib/triggers/new-order';
import { newOrderItem } from './lib/triggers/new-order-item';
import { newSubscription } from './lib/triggers/new-subscription';
import { newWebinarParticipant } from './lib/triggers/new-webinar-participant';
import { webinarParticipantAttend } from './lib/triggers/webinar-participant-attend';
import { webinarParticipantReminder } from './lib/triggers/webinar-participant-reminder';

export const coasyAuth = PieceAuth.CustomAuth({
  required: true,
  description: 'Enter coasy authentication details',
  props: {
    baseUrl: Property.ShortText({
      displayName: 'Base URL',
      description: 'Enter the base URL',
      required: false,
      defaultValue: 'https://backend.api.prod.coasy.io',
    }),
    apiKey: PieceAuth.SecretText({
      displayName: 'API Key',
      description: 'Enter the api key',
      required: true,
    }),
  },
});

export const coasy = createPiece({
  displayName: 'Coasy',
  auth: coasyAuth,
  description: 'Communicate with Coasy',
  minimumSupportedRelease: '0.20.0',
  logoUrl: 'https://console.coasy.io/favicon/apple-icon.png',
  authors: ['christian-schab'],
  actions: [
    createEventParticipant,
    createFunnelParticipant,
    createVoucher,
    enrollUserCourse,
    findEvent,
  ],
  triggers: [
    cancelledMembership,
    cancelledOrder,
    cancelledOrderItem,
    cancelledOrderprocess,
    cancelledSubscription,
    newAuthEvent,
    newCustomer,
    newFunnelParticipant,
    newMembership,
    newOrder,
    newOrderItem,
    newSubscription,
    newWebinarParticipant,
    webinarParticipantAttend,
    webinarParticipantReminder,
  ],
});
