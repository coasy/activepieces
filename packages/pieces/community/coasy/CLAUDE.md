# Coasy Piece — Internal Notes for Claude

## API Reference

The action endpoints used by this piece are documented in the private `coasy/coasy-core` repo:

https://github.com/coasy/coasy-core/blob/master/docs/apis/backend-api/apps-actions-handler.md

The doc is **private** — fetch it with `gh api repos/coasy/coasy-core/contents/docs/apis/backend-api/apps-actions-handler.md --jq '.content' | base64 -d`, not via WebFetch.

### Conventions shared by every action

- **Auth:** API key via `ApiKeyHelper.extractApiKey()`. The `appId` is resolved from the key — never pass `appId` in the body.
- **Base path:** `POST /apps/actions/<actionName>`
- **Validation:** Server-side via `class-validator`. Bad bodies return `400` with field details.
- **Response shape:** `{ "message": "...", "<entity>": { ... } }`

### Available actions (as of 2026-07-08)

| Action | Endpoint | Purpose |
| --- | --- | --- |
| `addTrialPeriod` | `POST /apps/actions/addTrialPeriod` | Grant a trial period to a user on an offer |
| `assignToUser` | `POST /apps/actions/assignToUser` | Append features / community topics / topic groups / meditation categories to a user |
| `createEventParticipant` | `POST /apps/actions/createEventParticipant` | Create a participant on an event (free or paid) |
| `createFunnelParticipant` | `POST /apps/actions/createFunnelParticipant` | Create a funnel participant for lead tracking |
| `createVoucher` | `POST /apps/actions/createVoucher` | Create a discount voucher tied to offers |
| `enrollUserCourse` | `POST /apps/actions/enrollUserCourse` | Enroll a user in a course |
| `findEvent` | `POST /apps/actions/findEvent` | Find events of the calling app by exact title |
| `removeFromUser` | `POST /apps/actions/removeFromUser` | Remove features / community topics / topic groups / meditation categories from a user |
| `sendPushNotification` | `POST /apps/actions/sendPushNotification` | Send a push notification to all of a user's devices |

### Gotchas worth remembering

- **`assignToUser`** requires at least one of `features` / `communityTopics` / `communityTopicGroups` / `meditationCategories`; otherwise the server returns `400`. Cross-app `userId` returns `401`, not `404`. It **does** validate that every referenced entity exists (`404` if not) — `removeFromUser` deliberately does not.
- **`removeFromUser`** (coasy-core PR #452) is the idempotent counterpart to `assignToUser`, same four array fields. Removing a value the user does not have is a **success**, not an error: HTTP `200`, `message: "Nothing to remove for user."`, `removed: {}`, and no write to the user record. Referenced entities are **not** existence-checked, so a deleted feature or meditation category stays removable. Same guards as `assignToUser` otherwise: unknown `userId` → `404`, cross-app `userId` → `401`, no field provided → `400`. The response adds a `removed` map reporting which values were actually present. Note the server rejects unknown body fields (`courses` is **not** supported here — courses use `enrollUserCourse`).
- **`sendPushNotification`** accepts a `topic` field in the DTO but it is silently discarded by the current `buildNotification` implementation — do not expose it as a piece property until the upstream handler is fixed.
- **`createFunnelParticipant`** lowercases `email` server-side. The response includes server-generated `funnelParticipantId`, `registrationTime`, and `timestamp`.
- **`createVoucher`** auto-generates the voucher ID (`VOC-…`) and sets `status: "ACTIVE"`. Setting `countLeft` implicitly sets `isCountLimited: true`.
- **`addTrialPeriod`** has its own domain error model (`AppSubscriptionError`) mapped to HTTP via `toApiErrorIfAppSubscriptionError` — surface the server's error message rather than masking it.
- **`addTrialPeriod` funnel guard** (coasy-core PR #220): the piece's `funnelGuard` array maps to the nested body `guards: { funnel: string[] }`. Guards are checked before the user is resolved; a match is a **silent no-op success** (`subscriptionStatus: "BLOCKED"`, `blockedBy` set, HTTP 200) — nothing is created/extended. Omitting it preserves original behavior.

When the upstream doc changes, refresh this file by re-fetching the source via `gh api`.
