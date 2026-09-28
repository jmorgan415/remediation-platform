# Remediation platform

Public Cursor SDK pipeline. Business-unit repositories do not contain `Agent.create`. They call [`.github/workflows/remediate.yml`](.github/workflows/remediate.yml).

The hang-gliding app calls that workflow from GitHub Actions. Locally, that app's `npm run plan` clones this repo from GitHub and runs it against that checkout. Callers do not keep a second copy beside their app, and they do not export `CURSOR_API_KEY`. A one-time `npm run login` on the machine writes `~/.cursor/sdk/auth.json`.

To work on this repo itself:

```bash
npm ci
npm run login
export TARGET_REPO=/absolute/path/to/app
npm run plan
```

`TARGET_REPO` is required here. The app caller sets it for you.

Triage is created with `read`, `grep`, `glob`, and `ls`. Fix adds `edit` and does not get a shell. Both calls are in `src/agents/triage.ts` and `src/agents/fix.ts`. The sandbox is on unless `CI` is set.
