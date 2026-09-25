import { resolve } from "node:path";

// The pipeline no longer lives inside the app it scans. Callers pass the app
// checkout explicitly so a business-unit repo cannot carry its own Agent.create.
export function targetRepo(): string {
  const fromEnv = process.env.TARGET_REPO;
  if (!fromEnv) {
    throw new Error("TARGET_REPO is required and must be the absolute path of the app repository to remediate.");
  }
  return resolve(fromEnv);
}
