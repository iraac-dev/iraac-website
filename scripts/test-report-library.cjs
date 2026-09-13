const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Load the real TypeScript data modules without adding a test-runner dependency.
function loadTs(file) {
  const filename = path.resolve(__dirname, "..", file);
  const source = fs.readFileSync(filename, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", compiled)(
    (specifier) => {
      if (!specifier.startsWith(".")) return require(specifier);
      return loadTs(
        path.relative(
          path.resolve(__dirname, ".."),
          path.resolve(path.dirname(filename), `${specifier}.ts`),
        ),
      );
    },
    module,
    module.exports,
  );
  return module.exports;
}

const { reportLibrary, audiences, findLibraryReport } = loadTs(
  "app/admin/reports/report-library.ts",
);
assert.equal(reportLibrary.length, 18);
assert.equal(new Set(reportLibrary.map((r) => r.slug)).size, 18);
assert.equal(new Set(reportLibrary.map((r) => r.id)).size, 18);
assert.deepEqual(
  [...new Set(reportLibrary.map((r) => r.month))],
  [
    "August 2026",
    "July 2026",
    "June 2026",
    "May 2026",
    "April 2026",
    "March 2026",
  ],
);
for (const month of new Set(reportLibrary.map((r) => r.month))) {
  assert.deepEqual(
    reportLibrary.filter((r) => r.month === month).map((r) => r.audience),
    [...audiences],
  );
}
for (const report of reportLibrary) {
  assert.equal(findLibraryReport(report.slug), report);
  assert.equal(report.status, "Draft");
  assert.equal(report.preparedDate, "13 September 2026");
  assert.ok(report.recipients && report.purpose && report.channel);
  assert.ok(report.sections.length >= 4);
  assert.ok(
    report.sections
      .flatMap((s) => s.paragraphs || [])
      .join(" ")
      .split(/\s+/).length >= 250,
    report.id +
      " words=" +
      report.sections
        .flatMap((s) => s.paragraphs || [])
        .join(" ")
        .split(/\s+/).length,
  );
  assert.ok(report.sources.length >= 1);
  assert.ok(
    !("sentAt" in report),
    "Drafts must not invent delivery timestamps",
  );
  assert.ok(
    !("recipientEmails" in report),
    "Demo reports must not expose private recipients",
  );
}
assert.equal(findLibraryReport("missing-report"), undefined);
assert.equal(new Set(reportLibrary.map((r) => r.title)).size, 18);
assert.equal(
  new Set(
    reportLibrary.map(
      (r) =>
        r.sections.find((s) => s.title === "Proposed response").paragraphs[0],
    ),
  ).size,
  18,
);
for (const report of reportLibrary.filter((r) =>
  r.sourceSlug.startsWith("bail-"),
)) {
  assert.equal(
    report.sources.filter((s) => s.href.startsWith("https://")).length,
    2,
  );
  assert.ok(
    report.sections.some((s) => s.title === "Bail: the legal support boundary"),
  );
}
console.log(
  "PASS: 18 unique written reports, six months, three audiences, honest draft provenance, sources and missing-report handling.",
);
