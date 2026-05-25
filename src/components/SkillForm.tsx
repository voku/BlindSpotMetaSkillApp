import React from 'react';
import { SkillDefinition, RoleType, CodingDirectionType, ToneType } from '../types';
import { Bug, Eye, Compass, Workflow, Settings, Hammer, Code2, Sparkles } from 'lucide-react';
import { getFocusAreas } from '../utils/focusAreas';

interface SkillFormProps {
  skill: SkillDefinition;
  onChange: (updates: Partial<SkillDefinition>) => void;
  onResetPreset: (id: string) => void;
}

const ROLES: { value: RoleType; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    value: 'developer',
    label: 'Developer',
    icon: <Bug className="w-4 h-4" />,
    desc: 'Bugs, mutable state, lifecycles, and architecture entropy'
  },
  {
    value: 'designer',
    label: 'UI/UX Designer',
    icon: <Eye className="w-4 h-4" />,
    desc: 'Alignment, accessibility, contrast, empty state traps'
  },
  {
    value: 'product_owner',
    label: 'Product Owner',
    icon: <Workflow className="w-4 h-4" />,
    desc: 'Ambiguous scope, creep, lacking metrics, user friction'
  },
  {
    value: 'custom',
    label: 'Custom Role',
    icon: <Compass className="w-4 h-4" />,
    desc: 'Specify your own constraints and validation criteria'
  }
];

const DOMAINS: { value: CodingDirectionType; label: string; icon: string; desc: string }[] = [
  { value: 'web', label: 'Web Stack', icon: '🌐', desc: 'Frontend frameworks, DOM re-renders, Hydration, CSS layout alignments' },
  { value: 'backend', label: 'Backend Architecture', icon: '🗄️', desc: 'Distributed SQL transactions, Thread concurrency race-conditions, SIGTERM limits' },
  { value: 'api', label: 'APIs & Protocols', icon: '🔌', desc: 'REST boundaries, gRPC payloads, Token exposures, Route rate limits' },
  { value: 'hardware', label: 'Hardware & Embedded', icon: '📟', desc: 'C/C++ firmware, physical registers, Memory-starved ISR buffers, watchdogs' },
  { value: 'mobile', label: 'Mobile Platforms', icon: '📱', desc: 'Android native, iOS Swift, SQLite offline sync, device gesture overrides' }
];

const TONES: { value: ToneType; label: string; desc: string }[] = [
  { value: 'constructive', label: 'Constructive Mentor 🎓', desc: 'Patient, educational, focuses on solutions.' },
  { value: 'strict', label: 'Senior Code General 🎖️', desc: 'Demands absolute standards & proof.' },
  { value: 'relentless', label: 'Obsessive Auditor 🔎', desc: 'Probes every hidden state and edge case.' },
  { value: 'no-bullshit', label: 'No-Bullshit Roaster 🔥', desc: 'Blunt, direct description of complete failure.' },
  { value: 'sarcastic', label: 'Witty Cynic 🎭', desc: 'Cynical jokes about over-engineering.' }
];

export default function SkillForm({ skill, onChange, onResetPreset }: SkillFormProps) {
  const activeFocusAreas = getFocusAreas(skill.role, skill.domain);

  const handleRoleChange = (role: RoleType) => {
    const areas = getFocusAreas(role, skill.domain).map(a => a.id);
    onChange({ role, focusAreas: areas });
  };

  const handleDomainChange = (domain: CodingDirectionType) => {
    const areas = getFocusAreas(skill.role, domain).map(a => a.id);
    onChange({ domain, focusAreas: areas });
  };

  const toggleFocusArea = (id: string) => {
    const updated = skill.focusAreas.includes(id)
      ? skill.focusAreas.filter(x => x !== id)
      : [...skill.focusAreas, id];
    onChange({ focusAreas: updated });
  };

  const addVerdict = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.currentTarget;
      const val = input.value.trim().toUpperCase().replace(/[^A-Z\s_]+/g, '');
      if (val && !skill.verdictLabels.includes(val)) {
        onChange({ verdictLabels: [...skill.verdictLabels, val] });
        input.value = '';
      }
    }
  };

  const removeVerdict = (v: string) => {
    onChange({ verdictLabels: skill.verdictLabels.filter(x => x !== v) });
  };

  const toggleReference = (key: keyof typeof skill.includeReferences) => {
    onChange({
      includeReferences: {
        ...skill.includeReferences,
        [key]: !skill.includeReferences[key]
      }
    });
  };

  return (
    <div id="skill-form-container" className="space-y-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm overflow-y-auto max-h-[85vh] font-sans">
      
      {/* Preset Custom Loader */}
      <div className="flex flex-col gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-500" />
            <h2 className="text-sm font-display font-bold tracking-tight text-slate-800">Configure Skill Specs</h2>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Load Predefined Template</label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            <button 
              type="button"
              onClick={() => onResetPreset('backend-architecture-stress-tester')}
              className={`flex flex-col items-start p-2.5 rounded-lg border transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                skill.id === 'backend-architecture-stress-tester' 
                  ? 'bg-orange-50 border-orange-400/60 text-orange-750 shadow-2xs' 
                  : 'bg-slate-50 border-slate-150 text-slate-500 hover:border-orange-500/30 hover:bg-slate-100 hover:text-slate-800 hover:shadow-xs'
              }`}
            >
              <span className="font-display text-[11px] font-bold uppercase tracking-wider mb-0.5">Backend Arch</span>
              <span className="text-[9px] opacity-75 text-left leading-tight">Architecture & threads</span>
            </button>
            <button 
              type="button"
              onClick={() => onResetPreset('accessibility-responsive-griller')}
              className={`flex flex-col items-start p-2.5 rounded-lg border transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                skill.id === 'accessibility-responsive-griller' 
                  ? 'bg-orange-50 border-orange-400/60 text-orange-750 shadow-2xs' 
                  : 'bg-slate-50 border-slate-150 text-slate-500 hover:border-orange-500/30 hover:bg-slate-100 hover:text-slate-800 hover:shadow-xs'
              }`}
            >
              <span className="font-display text-[11px] font-bold uppercase tracking-wider mb-0.5">UI/UX Auditor</span>
              <span className="text-[9px] opacity-75 text-left leading-tight">Layout & contrast</span>
            </button>
            <button 
              type="button"
              onClick={() => onResetPreset('api-protocol-griller')}
              className={`flex flex-col items-start p-2.5 rounded-lg border transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                skill.id === 'api-protocol-griller' 
                  ? 'bg-orange-50 border-orange-400/60 text-orange-750 shadow-2xs' 
                  : 'bg-slate-50 border-slate-150 text-slate-500 hover:border-orange-500/30 hover:bg-slate-100 hover:text-slate-800 hover:shadow-xs'
              }`}
            >
              <span className="font-display text-[11px] font-bold uppercase tracking-wider mb-0.5">API Protocol</span>
              <span className="text-[9px] opacity-75 text-left leading-tight">REST/gRPC limits</span>
            </button>
            <button 
              type="button"
              onClick={() => onResetPreset('hardware-firmware-griller')}
              className={`flex flex-col items-start p-2.5 rounded-lg border transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                skill.id === 'hardware-firmware-griller' 
                  ? 'bg-orange-50 border-orange-400/60 text-orange-750 shadow-2xs' 
                  : 'bg-slate-50 border-slate-150 text-slate-500 hover:border-orange-500/30 hover:bg-slate-100 hover:text-slate-800 hover:shadow-xs'
              }`}
            >
              <span className="font-display text-[11px] font-bold uppercase tracking-wider mb-0.5">Hardware</span>
              <span className="text-[9px] opacity-75 text-left leading-tight">Firmware & buffers</span>
            </button>
            <button 
              type="button"
              onClick={() => onResetPreset('mobile-app-griller')}
              className={`flex flex-col items-start p-2.5 rounded-lg border transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                skill.id === 'mobile-app-griller' 
                  ? 'bg-orange-50 border-orange-400/60 text-orange-750 shadow-2xs' 
                  : 'bg-slate-50 border-slate-150 text-slate-500 hover:border-orange-500/30 hover:bg-slate-100 hover:text-slate-800 hover:shadow-xs'
              }`}
            >
              <span className="font-display text-[11px] font-bold uppercase tracking-wider mb-0.5">Mobile App</span>
              <span className="text-[9px] opacity-75 text-left leading-tight">Offline sync states</span>
            </button>
            <button 
              type="button"
              onClick={() => onResetPreset('spec-ambiguity-griller')}
              className={`flex flex-col items-start p-2.5 rounded-lg border transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                skill.id === 'spec-ambiguity-griller' 
                  ? 'bg-orange-50 border-orange-400/60 text-orange-750 shadow-2xs' 
                  : 'bg-slate-50 border-slate-150 text-slate-500 hover:border-orange-500/30 hover:bg-slate-100 hover:text-slate-800 hover:shadow-xs'
              }`}
            >
              <span className="font-display text-[11px] font-bold uppercase tracking-wider mb-0.5">PO Assistant</span>
              <span className="text-[9px] opacity-75 text-left leading-tight">Ambiguous specs</span>
            </button>
            <button 
              type="button"
              onClick={() => onResetPreset('blind-spot-architect-unflinching')}
              className={`flex flex-col items-start p-2.5 rounded-lg border transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                skill.id === 'blind-spot-architect-unflinching' 
                  ? 'bg-orange-50 border-orange-400/60 text-orange-750 shadow-2xs' 
                  : 'bg-slate-50 border-slate-150 text-slate-500 hover:border-orange-500/30 hover:bg-slate-100 hover:text-slate-800 hover:shadow-xs'
              }`}
            >
              <span className="font-display text-[11px] font-bold uppercase tracking-wider mb-0.5" title="Unflinching Blind Spot Architect">Blind Spot Unflinching</span>
              <span className="text-[9px] opacity-75 text-left leading-tight">Hyper-focused analysis prompt</span>
            </button>
            <button 
              type="button"
              onClick={() => onResetPreset('unflinching-blindspot-architect')}
              className={`flex flex-col items-start p-2.5 rounded-lg border transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                skill.id === 'unflinching-blindspot-architect' 
                  ? 'bg-orange-50 border-orange-400/60 text-orange-750 shadow-2xs' 
                  : 'bg-slate-50 border-slate-150 text-slate-500 hover:border-orange-500/30 hover:bg-slate-100 hover:text-slate-800 hover:shadow-xs'
              }`}
            >
              <span className="font-display text-[11px] font-bold uppercase tracking-wider mb-0.5" title="Repo-First Stress Tester">Unflinching Architect</span>
              <span className="text-[9px] opacity-75 text-left leading-tight">Repo-first stress-tester</span>
            </button>
            <button 
              type="button"
              onClick={() => onResetPreset('ai-engineer-agentic-stack')}
              className={`flex flex-col items-start p-2.5 rounded-lg border transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                skill.id === 'ai-engineer-agentic-stack' 
                  ? 'bg-orange-50 border-orange-400/60 text-orange-750 shadow-2xs' 
                  : 'bg-slate-50 border-slate-150 text-slate-500 hover:border-orange-500/30 hover:bg-slate-100 hover:text-slate-800 hover:shadow-xs'
              }`}
            >
              <span className="font-display text-[11px] font-bold uppercase tracking-wider mb-0.5" title="AI Engineer & Agentic Stack">AI Agentic Stack</span>
              <span className="text-[9px] opacity-75 text-left leading-tight">Loop budgets & state drift</span>
            </button>
            <button 
              type="button"
              onClick={() => onResetPreset('no-bs-ai-architect-php')}
              className={`flex flex-col items-start p-2.5 rounded-lg border transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 ${
                skill.id === 'no-bs-ai-architect-php' 
                  ? 'bg-orange-50 border-orange-350 text-orange-750 shadow-2xs' 
                  : 'bg-slate-50 border-slate-150 text-slate-500 hover:border-orange-500/30 hover:bg-slate-100 hover:text-slate-800 hover:shadow-xs'
              }`}
            >
              <span className="font-display text-[11px] font-bold uppercase tracking-wider mb-0.5" title="No-BS AI Architect PHP">No-BS AI Architect</span>
              <span className="text-[9px] opacity-75 text-left leading-tight">Sync process & static PHP/Go/Rust</span>
            </button>
          </div>
        </div>
      </div>

      {skill.id === 'blind-spot-architect-unflinching' ? (
        <div className="space-y-5 p-4.5 bg-orange-50/40 border border-orange-200/80 rounded-xl shadow-xs animate-fade-in text-slate-800">
          <div className="flex items-center gap-2 pb-2.5 border-b border-orange-200/50">
            <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="text-xs font-bold font-display uppercase tracking-wider text-orange-850">
              Interactive Questionnaire Mode Active
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-orange-905 mb-1 font-display">
                Guiding Question 1: Laser Focus Area (GQ1)
              </label>
              <p className="text-[10px] text-slate-500 leading-normal mb-2">
                "To pinpoint your blind spots, what specific project, workflow, or type of decision should the analysis laser-focus on right now?"
              </p>
              <textarea
                className="w-full bg-white border border-slate-250 hover:border-orange-350 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 h-24 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500/20 transition resize-none shadow-2xs font-sans leading-relaxed"
                placeholder="e.g. This repo's Vite + TypeScript validation flow, default template wording, GitHub Pages metadata, and build/deploy path..."
                value={skill.gq1_focusArea || ''}
                onChange={(e) => onChange({ gq1_focusArea: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-orange-905 mb-1 font-display">
                Guiding Question 2: Hidden Fear / Deep Concern (GQ2)
              </label>
              <p className="text-[10px] text-slate-500 leading-normal mb-2">
                "Within that focus area, what hidden fear, recurring mistake, or uncomfortable truth are you perhaps avoiding that the analysis should expose?"
              </p>
              <textarea
                className="w-full bg-white border border-slate-250 hover:border-orange-350 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 h-24 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500/20 transition resize-none shadow-2xs font-sans leading-relaxed"
                placeholder="e.g. I may mistake missing npm installs for code regressions, drift into generic advice, or change deployment-related files without enough repo evidence..."
                value={skill.gq2_specificConcern || ''}
                onChange={(e) => onChange({ gq2_specificConcern: e.target.value })}
              />
            </div>
          </div>

          <div className="p-3 bg-white/75 rounded-lg border border-orange-200/40 text-[10px] text-orange-700 leading-normal">
            <strong>Prompt Generation Blueprint:</strong> Your answers are woven directly into the corresponding placeholder gates within the generated meta-prompt. Enjoy the dogfooding!
          </div>
        </div>
      ) : (
        <>
          {/* Basic Metadata */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider font-mono">Skill Name</label>
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition shadow-2xs"
                placeholder="e.g. design-griller-blindspot-v5"
                value={skill.name}
                onChange={(e) => onChange({ name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider font-mono">Description</label>
              <textarea
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 h-20 focus:bg-white focus:outline-none focus:border-orange-500 transition resize-none shadow-2xs"
                placeholder="What should this skill detect or challenge?"
                value={skill.description}
                onChange={(e) => onChange({ description: e.target.value })}
              />
            </div>
          </div>

          {/* NEW: Coding Direction (Domain) Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Hammer className="w-3.5 h-3.5 text-orange-500" />
              CODING DIRECTION / ENGINEERING DOMAIN
            </label>
            <p className="text-[10px] text-slate-400 font-sans leading-normal">
              Pick the target workspace domain. This automatically adapts the **Focus Quality Gates**, **Operating Contract Matrix**, and **Anti-Dogma checks**!
            </p>
            <div className="flex flex-col gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200 shadow-2xs">
              {DOMAINS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => handleDomainChange(d.value)}
                  className={`flex items-start gap-2.5 p-2 text-left rounded-md transition border ${
                    skill.domain === d.value
                      ? 'bg-orange-50 border-orange-300 text-orange-750 shadow-2xs'
                      : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                  }`}
                >
                  <span className="text-sm mt-0.5 select-none">{d.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold font-display uppercase tracking-wider flex items-center justify-between">
                      {d.label}
                      {skill.domain === d.value && (
                        <span className="text-[8px] font-mono px-1 py-0.2 bg-orange-600 text-white rounded font-normal lowercase">active</span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight font-sans mt-0.5 truncate uppercase">{d.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Target Programming Language Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-orange-505" />
              TARGET STACK / PROGRAMMING LANGUAGE
            </label>
            <p className="text-[10px] text-slate-400 font-sans leading-normal">
              Refine rules and static checks for a specific language ecosystem.
            </p>
            <select
              className="w-full bg-slate-55/40 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-semibold text-slate-700 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition shadow-2xs"
              value={skill.language || ''}
              onChange={(e) => onChange({ language: e.target.value || undefined })}
            >
              <option value="" className="font-sans text-slate-500 bg-white">GENERAL / MULTI-LANGUAGE</option>
              <option value="php" className="bg-white">PHP 8.1+ (Strict types, final/readonly, static analysis like PHPStan)</option>
              <option value="javascript" className="bg-white">JAVASCRIPT (ES Modules, clean async loops, prototype leakage prevention)</option>
              <option value="typescript" className="bg-white">TYPESCRIPT (Compiler strictness, type unions/discriminated types, full static safety)</option>
              <option value="nodejs" className="bg-white">NODE.JS (Platform modules, stream memory usage, safe event emitters)</option>
              <option value="rust" className="bg-white">RUST (Lifetimes, explicit Borrow Checker guarantees, error pattern matching)</option>
              <option value="go" className="bg-white">GO / GOLANG (Explicit error gates, light goroutines context, channel maps)</option>
            </select>
          </div>

          {/* Target Role Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider font-mono">Target Role Category</label>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => handleRoleChange(r.value)}
                  className={`flex flex-col items-start p-3 text-left rounded-lg border transition ${
                    skill.role === r.value
                      ? 'bg-orange-50 border-orange-300 text-orange-750 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-orange-300 hover:shadow-xs hover:text-slate-800 hover:bg-slate-100/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold font-display uppercase tracking-wider mb-1">
                    <span className={skill.role === r.value ? 'text-orange-655' : 'text-slate-400'}>{r.icon}</span>
                    {r.label}
                  </div>
                  <span className="text-[10px] text-slate-405 font-sans leading-tight">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tone Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider font-mono">AUDIT TONE TYPE</label>
            <select
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-orange-500/80 transition shadow-sm"
              value={skill.tone}
              onChange={(e) => onChange({ tone: e.target.value as ToneType })}
            >
              {TONES.map(t => (
                <option key={t.value} value={t.value} className="bg-white text-slate-800">{t.label}</option>
              ))}
            </select>
            <p className="text-[10px] text-slate-500 mt-1 font-mono italic">
              {TONES.find(t => t.value === skill.tone)?.desc}
            </p>
          </div>

          {/* Adaptive Focus Quality Gates */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Focus Quality Gates</label>
              <span className="text-[10px] px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-650 font-mono font-bold">
                {skill.focusAreas.length} Active
              </span>
            </div>
            <div className="space-y-2 max-h-[180px] overflow-y-auto bg-slate-50 border border-slate-200 rounded-lg p-2.5 shadow-2xs">
              {activeFocusAreas.map((area) => {
                const isChecked = skill.focusAreas.includes(area.id);
                return (
                  <label
                    key={area.id}
                    className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition select-none ${
                        isChecked 
                          ? 'bg-orange-50/70 border border-orange-251 text-slate-900 shadow-2xs' 
                          : 'bg-transparent border border-transparent text-slate-500 hover:bg-slate-100/50 hover:border-slate-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-orange-600 cursor-pointer"
                      checked={isChecked}
                      onChange={() => toggleFocusArea(area.id)}
                    />
                    <div className="flex-1">
                      <div className="text-xs font-bold font-display text-slate-800">{area.title}</div>
                      <div className="text-[10px] text-slate-500 leading-normal">{area.desc}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}
      {/* Custom Specific Rules */}
      <div>
        <label className="block text-xs font-semibold text-slate-505 mb-1.5 uppercase tracking-wider font-mono">CUSTOM SPECIFIC COMMANDMENTS</label>
        <textarea
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 h-16 focus:bg-white focus:outline-none focus:border-orange-500 transition resize-none font-mono shadow-2xs"
          placeholder="e.g. Always force a delete-path. Banish the Active Record pattern on large aggregates."
          value={skill.customRules}
          onChange={(e) => onChange({ customRules: e.target.value })}
        />
      </div>

      {/* Allowed verdicts */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">ALLOWED SYSTEM VERDICTS</label>
        <input
          type="text"
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition font-mono shadow-2xs"
          placeholder="TYPE VERDICT NAME + ENTER (e.g. NEEDS WORK)"
          onKeyDown={addVerdict}
        />
        <div className="flex flex-wrap gap-1.5 pt-1">
          {skill.verdictLabels.map(v => (
            <span key={v} className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono font-bold uppercase rounded bg-orange-50 border border-orange-200 text-orange-700 shadow-2xs">
              {v}
              <button 
                type="button" 
                onClick={() => removeVerdict(v)}
                className="text-orange-500 hover:text-orange-850 transition cursor-pointer font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
