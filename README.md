# Remediation platform

Shared Cursor SDK pipeline. Business-unit repositories call `.github/workflows/remediate.yml`. They do not contain `Agent.create`.

`TARGET_REPO` is the absolute path of the app checkout to scan and edit. The API key is passed in by the caller.

```bash
npm ci
export TARGET_REPO=/absolute/path/to/app
export CURSOR_API_KEY=cursor_...
npm run plan
```

Triage is created with `read`, `grep`, `glob`, and `ls`. Fix adds `edit` and does not get a shell. Both calls are in `src/agents/triage.ts` and `src/agents/fix.ts`.
