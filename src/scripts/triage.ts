import { targetRepo } from "../util/target-repo.js";
import { runAllScanners } from "../pipeline/scan.js";
import { runTriage, selectTriageCandidates } from "../agents/triage.js";
import { requireAuth } from "../util/require-auth.js";
import { formatTriageVerdicts } from "../util/format-verdicts.js";

const PROJECT_ROOT = targetRepo();

await requireAuth();

const findings = runAllScanners(PROJECT_ROOT);

const candidates = selectTriageCandidates(findings);
console.log(`${findings.length} findings scanned; ${candidates.length} resources selected for triage (high/critical severity):`);
for (const c of candidates) {
  console.log(`  ${c.file}::${c.identifier} (${c.findings.length} finding${c.findings.length === 1 ? "" : "s"})`);
}

console.log("\nRunning triage agent (Cursor SDK, read-only, local)...\n");
const verdicts = await runTriage(PROJECT_ROOT, findings);
console.log(formatTriageVerdicts(verdicts));
