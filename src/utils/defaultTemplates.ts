import { SkillDefinition } from '../types';

export const PRESET_TEMPLATES: SkillDefinition[] = [
  {
    id: 'blind-spot-architect-unflinching',
    name: 'Blind Spot Architect: Repo-First Recovery Loop',
    description: 'Generates a repo-first blind spot analysis prompt for TypeScript, Vite, and GitHub Pages workflows. Forces evidence from current files, local patterns, validation order, and deployment risk before proposing changes.',
    role: 'developer',
    domain: 'web',
    tone: 'no-bullshit',
    language: 'typescript',
    skillFormat: 'markdown',
    focusAreas: ['lifecycle', 'observability', 'rollback', 'dependencies'],
    customRules: '1. Repo-First Pattern Check: compare at least two in-repo examples before proposing a new structure.\n2. Intent Preservation: do not weaken strict contracts, metadata, or constants just to satisfy the currently visible runtime shape.\n3. High-Risk Surface Audit: treat workflows, deployment files, metadata, migrations, and already-run operational scripts as dangerous until proven otherwise.\n4. Validation Order Discipline: verify dependency/install state before interpreting lint/build failures.\n5. Durable Learning Loop: when a reviewer corrects a missed local pattern, encode the correction into the resulting workflow guidance.',
    outputMode: 'deep',
    verdictLabels: ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST'],
    includeReferences: {
      rubric: true,
      verdictMatrix: true,
      antiDogma: true,
      preflightScript: true
    },
    gq1_focusArea: 'This repository\'s Vite + TypeScript workflow, generated blind-spot skill wording, and GitHub Pages validation/deployment path',
    gq2_specificConcern: 'I may reach for generic backend/agent-loop advice, misread missing dependencies as real code failures, or improve structure without first matching the repository\'s existing pattern'
  },
  {
    id: 'unflinching-blindspot-architect',
    name: 'Unflinching Blind Spot Architect',
    description: 'Generates a hyper-focused, brutally honest, multi-part blind spot analysis prompt designed for a receiving AI with long-term memory. Demands an in-your-face analysis for professional and architectural growth.',
    role: 'developer',
    domain: 'backend',
    tone: 'relentless',
    skillFormat: 'markdown',
    focusAreas: ['lifecycle', 'mutable_state', 'observability', 'dependencies'],
    customRules: '1. Brutality: Prioritize truth over feelings. Do not soften language, use euphemisms, or hesitate.\n2. Laser Focus: Pay zero-mercy attention to tired, self-defeating patterns and architectural crutches.\n3. The 5 Phases: Output MUST address Understand, Explore, Attempt, Inspect, and Evolve phases sequentially.',
    outputMode: 'deep',
    verdictLabels: ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST', 'DEFER', 'GATHER EVIDENCE FIRST'],
    includeReferences: {
      rubric: true,
      verdictMatrix: true,
      antiDogma: true,
      preflightScript: false
    }
  },
  {
    id: 'backend-architecture-stress-tester',
    name: 'Backend Architecture Stress-Tester',
    description: 'Relentlessly roasts microservice layers, database transactions, caching strategies, and race conditions. Identifies mutable singletons or distributed split-brains.',
    role: 'developer',
    domain: 'backend',
    tone: 'no-bullshit',
    focusAreas: ['lifecycle', 'mutable_state', 'observability', 'rollback', 'dependencies'],
    customRules: 'Strictly check for distributed transaction bounds, race-conditions in global cache writes, and un-evicting memory-leak maps.',
    outputMode: 'deep',
    verdictLabels: ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST', 'DEFER', 'GATHER EVIDENCE FIRST'],
    includeReferences: {
      rubric: true,
      verdictMatrix: true,
      antiDogma: true,
      preflightScript: true
    }
  },
  {
    id: 'api-protocol-griller',
    name: 'REST/gRPC Contract & Idempotency Guard',
    description: 'Grills API boundaries, token leak risks, missing rate-limiting triggers, non-idempotent post/put routes, and lack of schema compliance checks.',
    role: 'developer',
    domain: 'api',
    tone: 'strict',
    focusAreas: ['observability', 'dependencies', 'rollback'],
    customRules: 'Every mutation endpoint MUST have an explicit idempotency-key check. Absolute ban on sending naked db IDs over public schemas.',
    outputMode: 'compact',
    verdictLabels: ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST', 'GATHER EVIDENCE FIRST'],
    includeReferences: {
      rubric: true,
      verdictMatrix: true,
      antiDogma: true,
      preflightScript: true
    }
  },
  {
    id: 'hardware-firmware-griller',
    name: 'Embedded Registers & RTOS Task Griller',
    description: 'Reviews C/C++ bare-metal code, memory buffers, polling frequencies, raw register shifts, interrupt handlers, and volatile memory leaks.',
    role: 'developer',
    domain: 'hardware',
    tone: 'relentless',
    focusAreas: ['lifecycle', 'mutable_state', 'dependencies'],
    customRules: 'Absolutely forbid dynamic heap allocations (malloc/new) inside real-time interrupt handling contexts. Guard against buffer overflows strictly.',
    outputMode: 'deep',
    verdictLabels: ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST'],
    includeReferences: {
      rubric: true,
      verdictMatrix: true,
      antiDogma: true,
      preflightScript: true
    }
  },
  {
    id: 'accessibility-responsive-griller',
    name: 'UI/UX Polish and Balance Griller',
    description: 'Design auditor to stress-test layout alignment, WCAG color contrast, content-overflow bugs, empty states, and responsive density. Rejects flat designs with zero visual weight.',
    role: 'designer',
    domain: 'web',
    tone: 'sarcastic',
    focusAreas: ['alignment', 'contrast', 'content_fit', 'responsiveness'],
    customRules: 'Never let sleek minimalism hide screen-reader voids, illegible text sizes, or unguided multi-click navigation pipelines. Reject empty static layouts.',
    outputMode: 'compact',
    verdictLabels: ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST', 'DEFER', 'GATHER EVIDENCE FIRST'],
    includeReferences: {
      rubric: true,
      verdictMatrix: true,
      antiDogma: true,
      preflightScript: true
    }
  },
  {
    id: 'mobile-app-griller',
    name: 'Mobile Resource & Offline Sync Inspector',
    description: 'Evaluates memory churn, battery drain bounds, offline state synchronization, and touch interactions on Android/iOS native and hybrid engines.',
    role: 'developer',
    domain: 'mobile',
    tone: 'strict',
    focusAreas: ['lifecycle', 'mutable_state', 'dependencies'],
    customRules: 'Must check local SQLite synchronization strategy under airplane mode or weak network conditions.',
    outputMode: 'compact',
    verdictLabels: ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST', 'DEFER', 'GATHER EVIDENCE FIRST'],
    includeReferences: {
      rubric: true,
      verdictMatrix: true,
      antiDogma: true,
      preflightScript: true
    }
  },
  {
    id: 'spec-ambiguity-griller',
    name: 'JIRA Story Ambiguity Griller',
    description: 'Product Owner assistant to stress-test ticket descriptions, requirements ambiguity, and scope-creep leaks. Identifies broad features lacking validation hooks.',
    role: 'product_owner',
    domain: 'web',
    tone: 'strict',
    focusAreas: ['ambiguity', 'scope_creep', 'testing_pressure', 'user_friction'],
    customRules: 'Unquantified business goals are banned. Every feature story must define its exact rollback plan and quantifiable regression testing bounds before coding starts.',
    outputMode: 'compact',
    verdictLabels: ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST', 'DEFER'],
    includeReferences: {
      rubric: true,
      verdictMatrix: true,
      antiDogma: true,
      preflightScript: true
    }
  },
  {
    id: 'ai-engineer-agentic-stack',
    name: 'AI Agentic Stack Griller',
    description: 'Relentlessly grills agent loop structures, recursive tool call budgets, token leakage vulnerabilities, divergent persistent states, and LLM hallucination traps.',
    role: 'developer',
    domain: 'backend',
    tone: 'no-bullshit',
    skillFormat: 'markdown',
    focusAreas: ['agent-flow-loop-logic', 'token-budget-leaks', 'agent-state-persistence'],
    customRules: '1. Strict Infinite Loop Check: Prevent unbounded agent self-correction steps.\n2. Validation Fallbacks: Enforce structured JSON schemas.\n3. Hard Budgets: Enforce static timeout boundaries.',
    outputMode: 'deep',
    verdictLabels: ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST'],
    includeReferences: {
      rubric: true,
      verdictMatrix: true,
      antiDogma: true,
      preflightScript: true
    }
  },
  {
    id: 'no-bs-ai-architect-php',
    name: 'No-BS AI Architect: Grumpy Senior Dev Mode',
    description: 'I eliminate inefficiencies, prevent bad design choices, and force pragmatic engineering. Providing autocompletion and full static analysis support is a non-negotiable requirement.',
    role: 'developer',
    domain: 'backend',
    tone: 'no-bullshit',
    language: 'php',
    skillFormat: 'markdown',
    focusAreas: ['mutable_state', 'lifecycle', 'observability', 'dependencies'],
    customRules: 'Assume all input is hostile, validate/sanitize at the boundary, and FAIL LOUDLY on security (No SQL injection, XSS, plaintext passwords).',
    outputMode: 'deep',
    verdictLabels: ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST', 'DEFER', 'GATHER EVIDENCE FIRST'],
    includeReferences: {
      rubric: true,
      verdictMatrix: true,
      antiDogma: true,
      preflightScript: true
    }
  }
];
