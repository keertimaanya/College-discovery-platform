import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * ESLint Flat Configuration rules for code quality
 * -----------------------------------------------------------------------------
 * ESLint analyzes your TypeScript/React code static patterns to identify
 * potential runtime errors, anti-patterns, or deviations from coding standards.
 * We include core web vitals and typescript validation rules.
 * -----------------------------------------------------------------------------
 */
const eslintConfig = defineConfig([
  ...nextVitals, // Checks for performance patterns like bad Image or Font imports
  ...nextTs, // Integration of strict TypeScript typing checks inside linting rules
  
  // Override and specify global folders that ESLint should ignore during analysis
  globalIgnores([
    ".next/**", // Ignores local Next.js build cache folder
    "out/**", // Ignores static bundle export directories
    "build/**", // Ignores build outputs
    "next-env.d.ts", // Ignores automatic Next declaration files
  ]),
]);

export default eslintConfig;
