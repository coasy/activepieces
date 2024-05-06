import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
import { createDomainOrder } from './lib/actions/create-domain-order';
import { getDomainOrder } from './lib/actions/get-domain-order';


export const namecloudAuth = PieceAuth.SecretText({
  displayName: 'API Token',
  required: true,
  description: 'Please enter your API Token',
});

export const namecloud = createPiece({
  displayName: 'Namecloud',
  auth: namecloudAuth,
  minimumSupportedRelease: '0.20.0',
  logoUrl: 'https://www.svgrepo.com/show/445722/domain.svg',
  authors: ["christian-schab"],
  actions: [createDomainOrder, getDomainOrder],
  triggers: []
});
