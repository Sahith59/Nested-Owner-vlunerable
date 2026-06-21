# BoLD App 2 - Nested/Odd-Named Owner

Standalone Next.js application for testing BoLD against an authorization flaw where the ownership signal is nested and renamed.

## Live Deployment

Production: https://bold-app-2-nested-owner.vercel.app

## Contract

- Route: `app/api/accounts/[id]/route.ts`
- Method: `GET`
- ID shape: account-style string, for example `/api/accounts/acct_northstar_001`
- Auth: request must come from a logged-in user
- Response owner shape: `{ "id": "...", "data": { "account": { "holderId": "usr_101" } } }`
- Intentional flaw: any logged-in user can read any account by ID, even when they do not hold it

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo Users

All accounts use password `demo1234`.

- `maya@bold.test` -> `usr_101`
- `liam@bold.test` -> `usr_202`
- `sofia@bold.test` -> `usr_303`

## Test Probe

1. Log in as `maya@bold.test`.
2. Visit `/api/accounts/acct_northstar_001`.
3. The response is Maya's account and includes `"holderId":"usr_101"` at `data.account.holderId`.
4. Visit `/api/accounts/acct_ledger_202`.
5. The response is Liam's account and includes `"holderId":"usr_202"`, even though Maya is still logged in.

That cross-user read is the intentional BOLA behavior for BoLD to detect.

## Deploy

This folder is self-contained and can be pushed as its own GitHub repository or imported directly into Vercel.
