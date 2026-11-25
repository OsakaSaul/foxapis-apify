#!/usr/bin/env node
// Builds every Actor folder from actors.json + _shared/. Samples are real published outputs, trimmed.
//   node generate.cjs                      rebuild from the samples already in the folders
//   node generate.cjs --samples <dir>      also refresh sample.json from <dir>/<sample name>.json
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = __dirname;
const { actors } = JSON.parse(fs.readFileSync(path.join(ROOT, "actors.json"), "utf8"));
const samplesDir = process.argv.includes("--samples") ? process.argv[process.argv.indexOf("--samples") + 1] : null;

// keep the shape of a real answer, shorten long lists and texts, and drop rendered page copies
// no private individual is named beside their pay in a store listing, and no vendor of AI models is named in a sample
function redact(v, key = "") {
  if (/people_on_record$/.test(key) && Array.isArray(v) && v.length) return ["[people removed from this sample]"];
  if (Array.isArray(v)) return v.filter((x) => !/(openai|anthropic|claude|gemini|chatgpt|gpt-\d)/i.test(JSON.stringify(x))).map((x) => redact(x, key));
  const MASK = "[name removed from this sample]";
  const hide = (k) => (k === "name" && /top_pay|listed|highest_paid|people_named|insider_holdings/.test(key)) || k === "person" || (k === "sentence" && /changes/.test(key));
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, hide(k) ? MASK : k === "holders" && Array.isArray(x) ? x.map(() => MASK) : redact(x, key + "." + k)]));
  return v;
}

function trim(v, depth = 0) {
  if (typeof v === "string") return v.length > 300 ? v.slice(0, 300) + " [shortened]" : v;
  if (Array.isArray(v)) { const out = v.slice(0, 2).map((x) => trim(x, depth + 1)); if (v.length > 2) out.push(`[${v.length - 2} more shortened]`); return out; }
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).filter(([k]) => !/html|markdown/i.test(k)).map(([k, x]) => [k, depth > 5 ? "[shortened]" : trim(x, depth + 1)]));
  return v;
}

const write = (file, text) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text.endsWith("\n") ? text : text + "\n"); };
const json = (o) => JSON.stringify(o, null, 2) + "\n";

(async () => {
  const { clean } = await import("./_shared/core.js");
  for (const a of actors) {
    const dir = path.join(ROOT, a.name);
    if (samplesDir && fs.existsSync(path.join(samplesDir, a.sample + ".json"))) {   // only the samples that are in the folder are refreshed
      const raw = JSON.parse(fs.readFileSync(path.join(samplesDir, a.sample + ".json"), "utf8"));
      let response = raw.response;
      if (response && response.status === "done" && response.result) response = response.result;
      const { strip, narrow } = await import("./_shared/core.js");
      response = strip(narrow(a.config, response), a.config.drop);
      if (a.sampleKeys) response = Object.fromEntries(a.sampleKeys.filter((k) => k in response).map((k) => [k, response[k]]));
      write(path.join(dir, "sample.json"), json({ captured: raw.captured, input: raw.request.body && Object.keys(raw.request.body).length ? raw.request.body : Object.fromEntries(new URLSearchParams(raw.request.query || "")), output: clean(trim(redact(response))) }));
    }
    const sample = JSON.parse(fs.readFileSync(path.join(dir, "sample.json"), "utf8"));
    for (const f of ["core.js", "main.js"]) write(path.join(dir, "src", f), fs.readFileSync(path.join(ROOT, "_shared", f), "utf8"));
    write(path.join(dir, "config.json"), json(a.config));
    write(path.join(dir, "package.json"), json({ name: a.name, version: "0.1.0", private: true, type: "module", dependencies: { apify: "^3.4.0" }, scripts: { start: "node src/main.js" } }));
    write(path.join(dir, "Dockerfile"), "FROM apify/actor-node:22\nCOPY package*.json ./\nRUN npm install --omit=dev --omit=optional\nCOPY . ./\nCMD npm start --silent\n");
    write(path.join(dir, ".dockerignore"), "node_modules\nstorage\n.env\n");
    write(path.join(dir, ".actor", "actor.json"), json({ actorSpecification: 1, name: a.name, title: a.title, description: a.description, version: "0.1", buildTag: "latest", defaultMemoryMbytes: 256, maxMemoryMbytes: 512, input: "./input_schema.json", dockerfile: "../Dockerfile", readme: "../README.md" }));
    write(path.join(dir, ".actor", "input_schema.json"), json({ title: a.title, type: "object", schemaVersion: 1, properties: a.input, required: a.config.required || [] }));
    // the prices are entered in Apify Console; this file is the list to copy from
    write(path.join(dir, ".actor", "pay_per_event.json"), json(Object.fromEntries(a.events.map((e) => [e.name, { eventTitle: e.title, eventDescription: e.description, eventPriceUsd: e.usd }]))));
    const readme = `# ${a.title}

${a.description}

## What you get

${a.returns.map((r) => `- ${r}`).join("\n")}

## Input

${Object.entries(a.input).map(([k, p]) => `- \`${k}\`${(a.config.required || []).includes(k) ? " (required)" : ""}: ${p.description}`).join("\n")}

## When you are charged

${a.events.map((e) => `- **${e.title}**: ${e.description}`).join("\n")}

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured ${sample.captured} for this input:

\`\`\`json
${JSON.stringify(sample.input, null, 2)}
\`\`\`

Shortened here (private names removed):

\`\`\`json
${JSON.stringify(sample.output, null, 2).split("\n").slice(0, 70).join("\n")}
\`\`\`

## Limits

${a.limits}
`;
    write(path.join(dir, "README.md"), readme);
    console.log(a.name, a.events.map((e) => `${e.name} $${e.usd}`).join(", "));
  }
})();
