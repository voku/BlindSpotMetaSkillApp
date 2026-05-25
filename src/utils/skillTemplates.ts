import { SkillDefinition } from '../types';
import { getFocusAreas } from './focusAreas';

/**
 * Main skill generator for SKILL.md
 */
export function generateSkillContent(skill: SkillDefinition): string {
  const language = skill.language || 'Agnostic';
  const folderName = (skill.name || 'blind-spot-roaster').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const availableAreas = getFocusAreas(skill.role, skill.domain);
  const isRepoFirstBlindSpot = skill.id === 'blind-spot-architect-unflinching';
  const activeFocusAreas = skill.focusAreas
    .map(id => availableAreas.find(a => a.id === id))
    .filter(Boolean);

  const focusAreaDetails = activeFocusAreas
    .map(a => `- **${a!.title}**: ${a!.desc}`)
    .join('\n');

  const formattedVerdictLabels = (skill.verdictLabels && skill.verdictLabels.length > 0)
    ? skill.verdictLabels.map(v => `- \`[${v}]\``).join('\n')
    : `- \`[REJECT]\`\n- \`[ACCEPT WITH CONSTRAINTS]\`\n- \`[MINIMAL PATCH FIRST]\`\n- \`[DEFER]\`\n- \`[GATHER EVIDENCE FIRST]\``;

  const preflightSection = skill.includeReferences.preflightScript ? `
## Preflight Verification Loop

Before the resulting Skill allows criticism or code changes, it must force this sequence:
1. Confirm the dependency/runtime state first (e.g. lockfile present, install step completed, generated assets available).
2. Read the smallest set of entry-point, generator, validation, and deploy files needed to understand the task.
3. Compare the proposed change against at least two existing repository patterns before inventing new structure.
4. Mark workflows, deployment files, metadata, migrations, and operational scripts as high-risk surfaces requiring extra evidence.
5. Only interpret lint/build failures after the environment is ready; missing dependencies are setup gaps, not product defects.
6. Do not declare the work complete until the request checklist, impacted files, and validation steps all line up.

---
` : '';

  return `# Create a Reusable Blind-Spot Roasting Skill: ${skill.name || 'blind-spot-roaster'}

You are not here to perform a one-time roast.

Your task is to create a reusable **Skill** for coding agents and LLMs that can brutally analyze, roast, and stress-test code, architecture, backend designs, migration plans, API designs, database schemas, deployment strategies, and product/technical ideas.

The Skill must be usable later by another LLM or coding agent.

The goal is to produce a complete \`SKILL.md\` file.

---

## Skill Purpose

Create a Skill that acts as a:

**${skill.role.toUpperCase()} ${skill.domain.toUpperCase()} Blind Spot Detector + Architecture Roaster + Evidence-Based Technical Critic**

It must expose weak assumptions, hidden coupling, runtime risks, bad abstractions, fake simplicity, missing tests, deployment hazards, observability gaps, and production failure modes.

It must work for:
- code review
- backend architecture review
- database schema review
- migration plans
- microservice designs
- Caching strategies
- transaction boundaries
- deployment plans
- long-running workers
- API contracts
- frontend/backend interaction designs
- generic technical ideas

Tailored to:
- **Ecosystem / Language:** \`${language}\`
- **Domain Focus:** \`${skill.domain.toUpperCase()}\`
- **Audit Tone Type:** \`${skill.tone.toUpperCase()}\`

---

## Core Requirement

The Skill must not merely criticize.

It must force the agent to:
1. Inspect available code and design evidence first.
2. Separate observed facts from inference with strict labels.
3. Identify the real failure mode.
4. Define an uncomfortable breaking test.
5. Propose the smallest corrective action (e.g., dynamic LRU limits, SIGTERM traps).
6. End with a clear logical verdict.

The Skill must avoid empty brutality.
Brutality without evidence is just noise.

---

## Required Skill File

Generate one complete \`SKILL.md\` file.

Use this frontmatter structure:

\`\`\`yaml
---
name: ${folderName}
description: ${skill.description || 'Evidence-based technical roast and blind-spot detector for code, architecture, backend systems, migrations, APIs, database schemas, deployment plans, and technical ideas.'}
---
\`\`\`

---

## Skill Behavior Checklist

The Skill you design must enforce these specific audits on target payloads:

${focusAreaDetails || '- Check for resource safety, thread boundaries, transaction limits, and deployment coupling.'}

${skill.customRules ? `### Custom Specific Commandments\n${skill.customRules}\n` : ''}

${isRepoFirstBlindSpot ? `
### Interactive Guiding Questions
The Skill must pay extra attention to these user-configured coordinates:
- **Primary Laser Focus Area (GQ1):** ${skill.gq1_focusArea || 'This repository\'s Vite/TypeScript workflow, generated prompt wording, and GitHub Pages deployment path.'}
- **Deepest Undercurrent Fear (GQ2):** ${skill.gq2_specificConcern || 'Defaulting to generic advice, misreading setup failures as code defects, or "improving" structure without matching repository-native patterns.'}

### Repository Reality Checks
The resulting Skill must explicitly challenge these blind spots whenever they apply:
- **Pattern drift:** prove that a proposed fix matches the current repository style before suggesting a new abstraction.
- **Intent erosion:** preserve intentional strictness in contracts, metadata, constants, and docs unless real repository evidence says otherwise.
- **Operational overconfidence:** treat deployment, workflow, metadata, and migration changes as production-risk multipliers.
- **False failure attribution:** verify setup state (dependencies, generated assets, environment variables) before trusting diagnostics.
- **Premature closure:** verify the original request, the changed files, and the validation results before declaring success.
` : ''}

---

## Evidence Rules to Program in the Skill

Every major claim or critique delivered by the resulting Skill **MUST** be explicitly labeled with one of the following evidence markers to prevent empty hallucinated rants:
- \`[OBSERVED]\`: Directly visible in the provided source code, file structures, schemas, or real operational logs.
- \`[MEMORY]\`: Based on documented user traits, workspace histories, or known recurring patterns from previous context.
- \`[INFERENCE]\`: Plausible, highly logical deductions based on target architecture, but not directly visible.
- \`[UNKNOWN]\`: Requires additional code, runtime logs, or specifications before a conclusion can be made.

---

${preflightSection}

## Analysis Workflow to Enforce in the Skill

Follow this multi-phase process sequentially:
1. **ALIGN — Define the Target**: Map what files or ideas are provided, what's missing, and what success demands.
2. **INSPECT — Extract Evidence**: Audit code, logs, and structures before forming claims. Quote real lines of code where possible.
3. **ROAST — Name the Blind Spots**: For each defect found, state the blind spot using the Evidence Rules (finding template).
4. **STRESS — Define the Breaking Test**: Design one concrete, uncomfortable test to expose the suspected failure.
5. **FIX — Minimal Corrective Action**: Propose the absolute smallest tactical fix first (e.g. deletion of redundant layers) rather than large speculative rewrites.
6. **VERDICT — Decide**: Close with a single, clear outcome tag.

---

## Output Format of the Skill Findings

All technical criticisms generated by the resulting Skill must follow this robust finding block structure:

\`\`\`markdown
### Finding X: [Name of Defect]
- **Evidence level:** \`[OBSERVED | MEMORY | INFERENCE | UNKNOWN]\`
- **Blind spot:** [What the user is ignoring or assuming]
- **Underlying weakness:** [Why this is fundamentally fragile]
- **Why it is dangerous:** [What production/incident disaster occurs as a result]
- **Failure mode:** [The step-by-step sequence of runtime collapse]
- **Uncomfortable test:** [How to break it physically or code-wise]
- **Minimal corrective action:** [The smallest surgical fix]
\`\`\`

---

## Final Verdict Matrix

The target Skill must conclude with exactly one of these verdict tags:
${formattedVerdictLabels}

Provide exactly one paragraph explaining the reasoning behind the selected verdict.

---

## Final Deliverable

Return a complete Skill package containing these exact template structures:
1. \`SKILL.md\` - Containing purposes, rules, modes, workflow, anti-patterns, and evidence rules.
2. \`examples/code-roast.md\` - Showing the mock code review applying evidence rules.
3. \`examples/architecture-roast.md\` - Illustrating distributed transaction auditing.
4. \`templates/finding-template.md\` - The structured Markdown output format.
5. \`templates/verdict-template.md\` - The dense, single-paragraph verdict decider.

Do not perform the roast yourself. Write the reusable roasting machine.
`;
}

/**
 * Compiles a rich multi-file package browser matching the user's specs
 */
export function generateCombinedPackage(skill: SkillDefinition): { path: string, content: string }[] {
  const folderName = (skill.name || 'blind-spot-roaster').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const language = skill.language || 'Agnostic';

  // Dynamic values
  const focusArea1 = skill.gq1_focusArea || 'Recursive agent state loops and transaction limits';
  const concern1 = skill.gq2_specificConcern || 'Cowboy state-persistence refactoring leading to broken concurrent builds';

  // File 1: SKILL.md
  const skillMd = generateSkillContent(skill);

  // File 2: examples/code-roast.md
  let codeSnippet = '';
  let roastIssues = '';
  
  if (language.toLowerCase() === 'rust') {
    codeSnippet = `// VULNERABLE RUST CODE - CONCURRENT PROCESS LOOP MEMORY LEAK
use std::collections::HashMap;
use lazy_static::lazy_static;
use std::sync::Mutex;

lazy_static! {
    static ref GLOBAL_SESSION_CACHE: Mutex<HashMap<String, Vec<u8>>> = Mutex::new(HashMap::new());
}

pub async fn handle_batch_job(session_id: String, payload: Vec<u8>) {
    // ❌ Mutex Guard held across an await split point without TTL or cleanup limit
    let mut cache = GLOBAL_SESSION_CACHE.lock().unwrap();
    cache.insert(session_id, payload);
    
    // Simulate async network write
    tokio::time::sleep(tokio::time::Duration::from_millis(50)).await;
    
    // ❌ Connection pool leaks on panic or error
    let connection = db_pool::get_conn().unwrap();
    connection.execute("INSERT_INTO_LOGS").unwrap();
}`;
    roastIssues = `- **Thread Bloat**: Lock contention across async awaits halts the Tokio reactor.
- **Unevicting Memory-Leak Map**: The static \`GLOBAL_SESSION_CACHE\` hashmap grows unbounded, leading to Out-Of-Memory (OOM) SIGKILL crashes in container runtimes.`;
  } else if (language.toLowerCase() === 'typescript' || language.toLowerCase() === 'javascript') {
    codeSnippet = `// VULNERABLE TYPESCRIPT CODE - UNBOUNDED MAPS & HANDLERS
import express from 'express';

const app = express();
const requestLogMap = new Map<string, any>(); // ❌ Unbounded global static cache

app.post('/api/compute-engine', async (req, res) => {
  const correlationId = req.headers['x-correlation-id'] as string;
  
  // ❌ Accidental leakage of per-request parameters into server closure cache
  requestLogMap.set(correlationId, req.body);
  
  // ❌ Missing graceful shutdown SIGTERM callback
  process.on('SIGTERM', () => {
    console.log('Shutting down server...'); // ❌ Logs but doesn't drain database pool
  });
  
  const result = await heavyCalculation();
  res.json(result);
});`;
    roastIssues = `- **Shared Context Leakage**: \`requestLogMap\` stores request objects globally without TTL, leaking high gigabytes of RAM in long-running node containers.
- **Thread Hijacking**: Multiple processes intercept SIGTERM listeners, causing chaotic event emitter errors and immediate pool dropouts, corrupting ongoing operations.`;
  } else {
    codeSnippet = `// VULNERABLE AGNOSTIC CODE - CONCURRENT POOL LEAKS
global static var CLIENT_CACHE = {}; 

function executeRequest(userId, requestData) {
    // ❌ Accidental global static cache without limits
    CLIENT_CACHE[userId] = requestData;
    
    // ❌ Database allocation inside concurrent thread without try-finally cleanup
    var conn = database.getConnection();
    var query = conn.prepare("UPDATE users SET metadata = ?");
    query.execute(requestData);
    
    // ❌ SIGTERM leaves connection dangling and socket saturated
    if (system.isShuttingDown()) {
        socket.closeDirectly(); 
    }
}`;
    roastIssues = `- **Pool Contention**: Database connections dangle during error throws, exhausting connection pools.
- **Accidental Static State Leakage**: Users can read other users' request limits because of \`CLIENT_CACHE\` leakage.`;
  }

  const codeRoastMd = `# Example Roast: Code Quality and Resource Safety

## Target Input Under Review
\`\`\`${language.toLowerCase() === 'agnostic' ? 'javascript' : language.toLowerCase()}
${codeSnippet}
\`\`\`

---

## Roast Report

### Finding 1: Uncapped Static Memory Leak Map
- **Evidence level:** \`[OBSERVED]\`
- **Blind spot:** Assuming container garbage collection cleans up static module variables alike request loops.
- **Underlying weakness:** Static or module-level maps reside inside persistent system RAM and never trigger garbage collection unless manually cleared.
- **Why it is dangerous:** Long-running web processes will progressively consume memory until the Linux OS sends SIGKILL, causing sudden client crashes.
- **Failure mode:**
  1. App handles 10,000 rapid user requests.
  2. Each payload is inserted blindly into the global static Cache.
  3. Memory bounds spike from 150MB past the 1GB container limit.
  4. Platform kills process mid-writes, corrupting db file buffers.
- **Uncomfortable test:** Replay 100,000 requests using a load generator and observe the container memory allocation metrics; watch it climb indefinitely without returning to the baseline.
- **Minimal corrective action:** Wrap global structures inside an LRU Cache with standard size-eviction and TTL boundaries:
  \`\`\`
  const CLIENT_CACHE = new LRUMap({ max: 1000, ttl: 60000 });
  \`\`\`

### Finding 2: Unsafe Thread/Pool Graceful Shutdown Bounds
- **Evidence level:** \`[OBSERVED]\`
- **Blind spot:** Believing process managers handle sigterm gracefully by default without application intervention.
- **Why it is dangerous:** Active database transactions lock tables, and abrupt shutdowns leave transactions halfway done, disrupting the database integrity.
- **Minimal corrective action:** Implement a synchronized shutdown driver that pauses route handlers, allows active connections to finalize with a 15-second timeout, and releases the DB connection pool cleanly.

---

### Final Verdict
\`[REJECT]\`
The code exhibits high architectural liabilities that will trigger severe production out-of-memory and db connection exhausts. It must not pass the pull-request gate.
`;

  // File 3: examples/architecture-roast.md
  const archRoastMd = `# Example Roast: Distributed Transaction Bounds and Split-Brain Reviews

## Target Architecture Under Review
We are designing a microservice system containing a \`BillingService\`, a \`WarehouseService\`, and an \`InventoryDB\`. They communicate via HTTP REST without an outbox event bus.
The transaction flow looks like:
1. \`BillingService\` charges the customer card via Stripe.
2. If Stripe succeeds, \`BillingService\` writes "PAID" logs to its database.
3. \`BillingService\` sends an asynchronous HTTP call to \`WarehouseService\` to allocate inventories.
4. If \`WarehouseService\` fails, \`BillingService\` tries to trigger a stripe refund manually.

---

## Roast Report

### Finding 1: False Transactional Bounds (Distributed Transaction Collapse)
- **Evidence level:** \`[INFERENCE]\`
- **Blind spot:** You are assuming that localized retry loops and manual HTTP compensation calls are safe substitutes for ACID transaction isolation.
- **Underlying weakness:** This architecture makes the system vulnerable to network partitions. If the network drops *after* Stripe charges but *before* step 3 completes or during the refund trigger, inventory remains unallocated and funds are held.
- **Failure mode:**
  1. Billing Service charges customer card successfully.
  2. The database logs are written correctly.
  3. A temporary routing glitch kills HTTP egress to the warehouse.
  4. Compensation refund fails because Stripe's refund API returns 502/504 errors.
  5. The system ends up in a split-brain state: the user charged, no inventory packed, and no refund issued.
- **Uncomfortable test:** Block network packets specifically to the warehouse service target during billing, and trigger consecutive checkout executions. Verify billing logs versus physical warehouse logs.
- **Minimal corrective action:** Implement an **Transactional Outbox Pattern**. Write the Stripe record and the "ALLOCATION_PENDING" outbox event to the *same local database* in a single ACID transaction. Then, let a dedicated reliable sender daemon route events toward the queue, backed by infinite retry triggers and idempotency-keys on the receiving end.

### Finding 2: Lack of Idempotency on Downstream Warehouses
- **Evidence level:** \`[INFERENCE]\`
- **Blind spot:** Warehouse Service consumes identical webhook packets multiple times without double-action guards, assuming clients are well-behaved.
- **Minimal corrective action:** Downstream endpoints MUST check for duplicate UUID payloads inside a fast redis lock-store before mutating local inventories.

---

### Final Verdict
\`[ACCEPT WITH CONSTRAINTS]\`
The architecture is fundamentally flawed but can proceed under the strict constraint that no distributed charge is executed without an active Transactional Outbox database table.
`;

  // File 4: examples/backend-runtime-roast.md
  const runtimeRoastMd = `# Example Roast: Runtime Pool Shutdown & Memory Tracing Reviews

## Domain Target: Backend Worker Lifecycles & Concurrency Engines

### Focus Checks
- Graceful termination bounds
- Connection leaking loops
- Static cache memory footprint
- Tracing correlation chains

---

## Roast Report

### Finding 1: Un-evicting Memory-Leak Loops inside Long-Running Workers
- **Evidence level:** \`[INFERENCE]\`
- **Blind spot:** Assuming worker memory footprints stay stable because they are simple event listeners.
- **Why it is dangerous:** Continuous runtime triggers collect transaction history traces dynamically inside global memory vectors to output debugging stats. Without bounds, consumer containers will crash every 48 hours.
- **Uncomfortable test:** Spindle 10,000 mock SQS messages targeting a localized thread. Profile the node/Go process heap dump and inspect the retained objects in memory.
- **Minimal corrective action:** Enforce strict garbage collection schedules, use weak-references where appropriate, and cap profiling tracing sizes to 500 items max with FIFO eviction.

### Finding 2: Swallowed SQL Try-Catch Blocks & Missing Correlation Chains
- **Evidence level:** \`[OBSERVED]\`
- **Blind spot:** Believing typical logging catch statements are operationally sufficient without propagating parent trace context down the stack.
- **Failure mode:** Under high database contention, queries time out. The catch blocks swallow original trace context and output generic \`"DB Write Error"\` messages, leaving SREs completely blind during production incidents.
- **Minimal corrective action:** Implement a unified tracer class holding an immutable \`CorrelationId\`. This ID must propagate inside query payloads via comments and as structured log attributes, enabling end-to-end trace correlation.

---

### Final Verdict
\`[MINIMAL PATCH FIRST]\`
Re-engineer the catch blocks to append trace correlation IDs immediately. Set memory profiling limits before scaling node worker concurrency structures.
`;

  // File 5: examples/idea-roast.md
  const ideaRoastMd = `# Example Roast: Speculative Helper Complexity & Abstraction Reviews

## Technical Proposal Under Review
*"We should construct a universal, highly abstract database wrapper inside our application codebase. This wrapper will dynamically generate SQL schemas, abstract physical drivers (supporting MySQL, DynamoDB, and Redis interchangeably), and bundle schema validators. This will isolate business rules completely from the physical stack."*

---

## Roast Report

### Finding 1: Speculative Base Class bloat ("Framework Inside the App")
- **Evidence level:** \`[INFERENCE]\`
- **Blind spot:** You are anticipating a magical physical-migration requirement that has a 1% chance of actually happening in the next 3 years.
- **Underlying weakness:** Writing database wrappers that abstract divergent paradigms (relational schemas, document caches, key-value keys) results in an incredibly complex, buggy, and low-performance denominator. Developers spend more time writing custom AST parsers rather than shipping feature value.
- **Why it is dangerous:** You create code that is virtually impossible to delete or refactor. Simple tasks like adding an index or a custom JOIN query require editing thousands of lines of wrapper classes.
- **Uncomfortable test:** Try implementing one transactional relational atomic operation across tables using your abstract wrapper, and contrast the execution volume and trace files against writing a raw validated SQL call.
- **Minimal corrective action:** Delete the abstract wrapper plan. Establish simple Repository interfaces for your business objects, and implement them directly against your active ORM or SQL client (e.g., Prisma, Diesel, or Sqlx). Let Postgres be Postgres.

---

### Final Verdict
\`[REJECT]\`
This proposal is classic "Gold-plating" overengineering. It serves developer convenience dreams while introducing high operational bugs, and lacks any immediate business justification. Save the 4 weeks of refactoring.
`;

  // File 6: examples/migration-roast.md
  const migrationRoastMd = `# Example Roast: Schema Compatibility & Zero-Downtime Rollover Reviews

## Migration Proposal Under Review
We are upgrading our \`users\` table structure by renaming the column \`contact_address\` to \`mailing_address\`. The proposed migration script simply executes:
\`ALTER TABLE users RENAME COLUMN contact_address TO mailing_address;\`
This will run as part of our CI/CD pipeline immediately prior to deploying the new server version.

---

## Roast Report

### Finding 1: Backward-Incompatible Schema Alteration (Immediate Downtime Risk)
- **Evidence level:** \`[OBSERVED]\`
- **Blind spot:** You are assuming the application server code and the database schemas deploy simultaneously.
- **Why it is dangerous:** In high-scale Kubernetes rolling deploys, old and new server versions run *concurrently* against the same physical database for several minutes, if not hours. The moment the ALTER command executes, the active "old" servers running the live client requests will immediately crash on any query referencing \`contact_address\`.
- **Failure mode:**
  1. CI pipeline runs the direct ALTER migration.
  2. Database executes the change instantly.
  3. 95% of active old-version API containers throw 500 errors to users because \`contact_address\` column doesn't exist anymore.
  4. Rolling deploy takes 8 minutes to bring up new-version pods, during which customers experience full service failure.
- **Uncomfortable test:** Spin up the current server version on your local machine, run the ALTER table migration inside Postgres, and count how many active API endpoints error out immediately before launching the new version.
- **Minimal corrective action:** Deploy via **Expand, Migrate, and Contract** phases:
  1. **Phase 1 (Expand)**: Add the new column \`mailing_address\` (nullable) to the table. Run deployment. (Both old and new versions run safely. New version writes to both columns; old version writes to \`contact_address\`).
  2. **Phase 2 (Migrate)**: Run a background migration script to copy existing data from \`contact_address\` to \`mailing_address\` in small, non-blocking indexed batches.
  3. **Phase 3 (Contract)**: Update all application code references to use \`mailing_address\` only. Deploy. Stop writing to old column.
  4. **Phase 4 (Cleanup)**: Drop the old column \`contact_address\` safely.

---

### Final Verdict
\`[REJECT]\`
The migration script is highly destructive and guarantees service interruption during deployment. Rewrite using the expand/migrate/contract protocol.
`;

  // File 7: templates/finding-template.md
  const findingTemplateMd = `### Finding X: [Name of Detected Issue]

- **Evidence level:** \`[OBSERVED | MEMORY | INFERENCE | UNKNOWN]\`
- **Blind spot:** [What specific operational assumption or design shortcut is being ignored?]
- **Underlying weakness:** [Describe the technical flaw or code anti-pattern clearly]
- **Why this is dangerous:** [What physical scenario or runtime failure triggers an incident?]
- **Failure mode:**
  1. [Step 1: Specific input or event triggers the issue]
  2. [Step 2: State begins to mutate, leak, or fail]
  3. [Step 3: Downstream databases, thread bounds, or cache states break down]
  4. [Step 4: Full client crash or un-logged incident occurs]
- **Uncomfortable test:** [Define one physical test, concurrent load script, or error inject to prove this vulnerability]
- **Minimal corrective action:**
  [Specify the absolute smallest patch to secure this, with exact code examples or schema fixes]
`;

  // File 8: templates/verdict-template.md
  const verdictTemplateMd = `## Final Verdict

\`[REJECT | ACCEPT WITH CONSTRAINTS | MINIMAL PATCH FIRST | DEFER | GATHER EVIDENCE FIRST]\`

---

### Verdict Justification

[Write exactly one professional, clear, and objective paragraph here summarizing why this verdict was selected. Explain which key finding remains blocking, what constraints must be deployed immediately to enable acceptance, or what evidence is missing to conclude the report. Keep the paragraph dense, precise, and highly actionable.]
`;

  // Return full suite
  return [
    {
      path: `prompts/${folderName}/SKILL.md`,
      content: skillMd
    },
    {
      path: `prompts/${folderName}/examples/code-roast.md`,
      content: codeRoastMd
    },
    {
      path: `prompts/${folderName}/examples/architecture-roast.md`,
      content: archRoastMd
    },
    {
      path: `prompts/${folderName}/examples/backend-runtime-roast.md`,
      content: runtimeRoastMd
    },
    {
      path: `prompts/${folderName}/examples/idea-roast.md`,
      content: ideaRoastMd
    },
    {
      path: `prompts/${folderName}/examples/migration-roast.md`,
      content: migrationRoastMd
    },
    {
      path: `prompts/${folderName}/templates/finding-template.md`,
      content: findingTemplateMd
    },
    {
      path: `prompts/${folderName}/templates/verdict-template.md`,
      content: verdictTemplateMd
    }
  ];
}
