import { createAction, Property } from '@activepieces/pieces-framework';
import { coasyAuth } from '../../index';
import { runCoasyAction } from '../common/actions';
import { emailTemplateId, emailTemplateKey } from '../common/emailTemplates';

const name = 'sendEmail';

export const sendEmail = createAction({
  auth: coasyAuth,
  name,
  displayName: 'Send Email',
  description: 'Queues an email dispatch to a raw email address',
  props: {
    toEmail: Property.ShortText({
      displayName: 'To Email',
      description: 'Recipient email address',
      required: true,
    }),
    toName: Property.ShortText({
      displayName: 'To Name',
      description: 'Optional recipient name',
      required: false,
    }),
    templateKey: emailTemplateKey,
    templateId: emailTemplateId,
    bcc: Property.Array({
      displayName: 'BCC',
      description: 'Optional blind copy recipients',
      required: false,
    }),
    data: Property.Object({
      displayName: 'Template Variables',
      description:
        'Optional template variables. Only keys known to the Coasy MetaData DTO are accepted, e.g. firstName, lastName, link, voucherCode — unknown keys are rejected with a 400.',
      required: false,
    }),
    attachments: Property.Array({
      displayName: 'Attachments',
      required: false,
      properties: {
        filename: Property.ShortText({
          displayName: 'Filename',
          required: true,
        }),
        contentType: Property.ShortText({
          displayName: 'Content Type',
          description: 'MIME type, e.g. application/pdf',
          required: true,
        }),
        base64Content: Property.LongText({
          displayName: 'Base64 Content',
          required: true,
        }),
      },
    }),
  },
  // templateKey / templateId are XOR — both optional here, the server rejects both-or-neither.
  run: (configValue) => {
    const { bcc, ...rest } = configValue.propsValue;
    // An untouched BCC array arrives as [], which the server treats as "set" and
    // then skips adding the archive address to the dispatch — omit it instead.
    const request = Array.isArray(bcc) && bcc.length > 0 ? { ...rest, bcc } : rest;

    return runCoasyAction(configValue, name, request);
  },
});
