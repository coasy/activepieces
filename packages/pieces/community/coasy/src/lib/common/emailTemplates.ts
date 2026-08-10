import { Property } from '@activepieces/pieces-framework';
import { CoasyAuth, createCoasyClient } from './coasyClient';

export interface EmailTemplate {
  templateKey: string;
  emailTemplateId: string;
  name: string;
  subject: string;
  language?: string;
}

export const fetchEmailTemplates = async (
  auth: CoasyAuth
): Promise<EmailTemplate[]> => {
  const response = (await createCoasyClient(auth).action(
    'listEmailTemplates',
    {}
  )) as { templates?: EmailTemplate[] };

  return response.templates ?? [];
};

const templateLabel = (template: EmailTemplate) =>
  template.language ? `${template.name} (${template.language})` : template.name;

export const emailTemplateKey = Property.Dropdown({
  displayName: 'Email Template',
  description:
    'Template configured for this app under a template key. Set either this or the Template ID, not both.',
  required: false,
  refreshers: ['auth'],
  options: async ({ auth }) => {
    if (!auth) {
      return {
        disabled: true,
        placeholder: 'Connect your account',
        options: [],
      };
    }

    const templates = await fetchEmailTemplates(auth as CoasyAuth);

    if (templates.length === 0) {
      return {
        disabled: true,
        placeholder: 'This app has no email templates configured',
        options: [],
      };
    }

    return {
      options: templates.map((template) => ({
        label: templateLabel(template),
        value: template.templateKey,
      })),
    };
  },
});

export const emailTemplateId = Property.ShortText({
  displayName: 'Template ID',
  description:
    'ID of an email template of this app, e.g. EMT-A7O-ODB-PL7. Any template of the app works, also funnel and broadcast templates that are not bound to a template key. Set either this or the Email Template, not both.',
  required: false,
});
