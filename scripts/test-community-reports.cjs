const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

function loadTs(file) {
  const filename = path.resolve(__dirname, "..", file);
  const source = fs.readFileSync(filename, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", compiled)(require, module, module.exports);
  return module.exports;
}

const { communityReports, findCommunityReport } = loadTs(
  "app/reports/report-data.ts",
);

assert.equal(communityReports.length, 6);
assert.equal(new Set(communityReports.map((report) => report.slug)).size, 6);

for (const report of communityReports) {
  assert.equal(findCommunityReport(report.slug), report);
  assert.ok(report.sections.length >= 7, `${report.slug} needs at least seven sections`);
  assert.ok(
    report.sections.every(
      (section) =>
        (section.paragraphs && section.paragraphs.length > 0) ||
        (section.points && section.points.length > 0),
    ),
    `${report.slug} contains an empty section`,
  );

  const words = [
    report.summary,
    report.centralMessage,
    report.notice || "",
    ...report.sections.flatMap((section) => [
      section.title,
      ...(section.paragraphs || []),
      ...(section.points || []),
    ]),
  ]
    .join(" ")
    .trim()
    .split(/\s+/).length;

  assert.ok(words >= 900, `${report.slug} words=${words}`);
}

assert.equal(findCommunityReport("missing-report"), undefined);
console.log("PASS: six public community reports each contain at least seven sections and 900 words.");
