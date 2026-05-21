import { RoleType, CodingDirectionType } from '../types';

export const getFocusAreas = (role: RoleType, domain: CodingDirectionType) => {
  if (role === 'developer') {
    switch (domain) {
      case 'web':
        return [
          { id: 'mutable_state', title: 'Client Context Pollution', desc: 'React context re-render loops, client state leaks, or parallel hook mismatches' },
          { id: 'lifecycle', title: 'Listener & Timer Cleanups', desc: 'Dangling window event listeners, interval tasks, unmounted state triggers' },
          { id: 'observability', title: 'Client Sentry Tracking', desc: 'Quiet console warnings, hollow frontend error borders, rate-limit failures' },
          { id: 'rollback', title: 'Service Worker Updates', desc: 'Static asset cache loops, broken index.html backfills on deployment rolls' },
          { id: 'dependencies', title: 'Bundled npm Node Bloat', desc: 'Over-bloated page-load chunk sizes, massive third-party library weights' }
        ];
      case 'backend':
        return [
          { id: 'mutable_state', title: 'Shared static structures', desc: 'Process-local global singletons carrying request parameters cross-threads' },
          { id: 'lifecycle', title: 'Pool & Thread shutdown', desc: 'Graceful SIGTERM terminations, loose database pools, memory leakage maps' },
          { id: 'observability', title: 'Distributed Log Tracing', desc: 'Lack of correlation/span IDs, swallowed SQL try-catch exceptions' },
          { id: 'rollback', title: 'Back-compatible DB schemas', desc: 'Destructive ALTER tables which block previous server versions during deployment' },
          { id: 'dependencies', title: 'Deep Abstract Helpers', desc: 'Massive nesting layers, speculative base layers with zero actual repeat uses' },
          { id: 'agent-flow-loop-logic', title: 'Agent Flow & Loop Logic', desc: 'Infinite recursive loops, runaway agent self-triggers, and execution circular traps' },
          { id: 'token-budget-leaks', title: 'Token Budget Leaks', desc: 'Unbounded context window usage, runaway LLM token exhaustion, cost-budget breaches' },
          { id: 'agent-state-persistence', title: 'Agent State Persistence', desc: 'Divergent session memories, transient workspace drift, and inconsistent scratchpad states' }
        ];
      case 'api':
        return [
          { id: 'mutable_state', title: 'Inter-request caches', desc: 'In-memory caching of auth details, risk of credential collision' },
          { id: 'lifecycle', title: 'Dangling keeps & webhooks', desc: 'Un-closed outgoing webhook loops, missing keep-alive endpoint timeouts' },
          { id: 'observability', title: 'Gateway Access logs', desc: 'Vague server console outputs, missing caller identity headers on exceptions' },
          { id: 'rollback', title: 'Semantic API Versioning', desc: 'Breaking public properties without sunset timing headers or deprecation blocks' },
          { id: 'dependencies', title: 'Coupled proprietary SDKs', desc: 'Naked vendor SDK types on public schemas, hindering mock testing' }
        ];
      case 'hardware':
        return [
          { id: 'mutable_state', title: 'Volatile variable locks', desc: 'Unprotected register shifts, race-conditions in multi-interrupt contexts' },
          { id: 'lifecycle', title: 'Platforms busy-wait locks', desc: 'Infinite while() loops without yield commands, missing hardware watchdogs' },
          { id: 'observability', title: 'Serial UART console logs', desc: 'Missing physical bootcode LEDs, un-reported memory parity checks' },
          { id: 'rollback', title: 'Bricked upgrade recoveries', desc: 'Lack of fail-safe dual partitions on OTA upgrade flashes' },
          { id: 'dependencies', title: 'Statically-linked bundles', desc: 'Excessive header imports yielding binary blobs too massive for bare-metal flash' }
        ];
      case 'mobile':
        return [
          { id: 'mutable_state', title: 'Fragment memory leaks', desc: 'State references retained in view-bindings, leaking background memory' },
          { id: 'lifecycle', title: 'OS background limits', desc: 'Sudden termination handling, state preservation on device orientation changes' },
          { id: 'observability', title: 'Native Crash Logs', desc: 'Uncaught native C/C++ exceptions, quiet background synchronizers' },
          { id: 'rollback', title: 'Offline database upgrade', desc: 'No-test SQLite upgrading routes, breaking application state on user rollbacks' },
          { id: 'dependencies', title: 'Draining native SDK sizes', desc: 'Oversized compiled archives, heavy third-party framework battery strains' }
        ];
    }
  } else if (role === 'designer') {
    switch (domain) {
      case 'web':
        return [
          { id: 'alignment', title: 'Grid Layout Shifts', desc: 'Cluttered padding, overlapping elements, grid breakages on localized viewports' },
          { id: 'contrast', title: 'WCAG standard limits', desc: 'Faint gray characters on white cards, interactive widgets lacking focus marks' },
          { id: 'motion', title: 'Layout shifts (CLS)', desc: 'Heavy cumulative frame shifts, sluggish transitions delaying inputs' },
          { id: 'content_fit', title: 'Empty dynamic state cards', desc: 'UI collapsing when user inputs are empty, no graceful fallback illustrations' },
          { id: 'responsiveness', title: 'Mobile Touch Targets', desc: 'Clickable elements under 44px, rigid static column bounds' }
        ];
      default:
        return [
          { id: 'alignment', title: 'Interface spacing density', desc: 'Inconsistent layout structure, crowded panels, brand guidelines drift' },
          { id: 'contrast', title: 'Visual contrast metrics', desc: 'Lack of accessible key color weights, muddy information layout hierarchies' },
          { id: 'motion', title: 'Sluggish view transitions', desc: 'Delaying response signals, lack of dynamic interaction feedback' },
          { id: 'content_fit', title: 'Varying text overflow limits', desc: 'Unreasonable layouts that break under extremely long descriptions/titles' },
          { id: 'responsiveness', title: 'Screen scale flexibility', desc: 'Visual items colliding on narrow width boundaries or giant displays' }
        ];
    }
  } else {
    // Product Owner
    return [
      { id: 'ambiguity', title: 'Vague acceptance constraints', desc: 'Requirements like "this search must feel robust, fast and incredibly dynamic"' },
      { id: 'scope_creep', title: 'Speculative dashboards', desc: 'Demanding massive statistics reports and metrics prior to active system user testing' },
      { id: 'testing_pressure', title: 'Manual validation runs', desc: 'Absence of quantifiable regression bounds and automated user journeys' },
      { id: 'user_friction', title: 'Form collision blocks', desc: 'Missing draft auto-saves, tedious double-clicks, and redundant format limits' },
      { id: 'migration_path', title: 'Obsolete rollback alerts', desc: 'Lack of migration backfill communications, triggering lock-out issues' }
    ];
  }
};
