import React, { useState } from 'react';
import { SkillDefinition, GeneratedFile } from './types';
import { PRESET_TEMPLATES } from './utils/defaultTemplates';
import { generateSkillContent, generateCombinedPackage } from './utils/skillTemplates';
import { validateAndHealSkillDefinition, ValidationError } from './utils/validation';
import SkillForm from './components/SkillForm';
import PackageBrowser from './components/PackageBrowser';
import { Settings, Layers, Sparkles, Flame, Check, ExternalLink, HelpCircle, AlertTriangle, X } from 'lucide-react';

export default function App() {
  const [skill, setSkill] = useState<SkillDefinition>(() => {
    return validateAndHealSkillDefinition(PRESET_TEMPLATES[0]);
  });
  const [activeTab, setActiveTab] = useState<'specifications' | 'package_preview'>('specifications');
  const [copiedLink, setCopiedLink] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  // Handle preset switching
  const handleResetPreset = (id: string) => {
    const found = PRESET_TEMPLATES.find(p => p.id === id);
    if (found) {
      const errorsList: ValidationError[] = [];
      const healed = validateAndHealSkillDefinition(found, (errs) => {
        errorsList.push(...errs);
      });
      setValidationErrors(errorsList);
      setSkill(healed);
    }
  };

  // Merge form updates into skill definition
  const handleSkillChange = (updates: Partial<SkillDefinition>) => {
    setSkill(prev => {
      const merged = { ...prev, ...updates };
      const errorsList: ValidationError[] = [];
      const healed = validateAndHealSkillDefinition(merged, (errs) => {
        errorsList.push(...errs);
      });
      setValidationErrors(errorsList);
      return healed;
    });
  };

  // Generate actual text contents based on current state
  const skillMarkdown = generateSkillContent(skill);
  const files: GeneratedFile[] = generateCombinedPackage(skill);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col justify-between font-sans selection:bg-orange-100 selection:text-orange-950">
      
      {/* Dynamic light sunrise glow backdrop */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-orange-400/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[-100px] left-[15%] w-[400px] h-[300px] bg-orange-500/3 blur-[120px] rounded-full pointer-events-none" />

      {/* Main navigation & top panel */}
      <header className="relative max-w-7xl w-full mx-auto px-4 pt-6 pb-4 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-rose-500 to-red-600 shadow-md">
            <Flame className="w-5.5 h-5.5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              Der Griller
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-655 font-bold font-mono uppercase tracking-widest shadow-2xs">
                Skill Generator
              </span>
            </h1>
            <p className="text-xs text-slate-505 font-sans leading-none mt-1.5">
              Forging rigorous, brutally honest, multi-phase blind spot analysis prompts for AI systems.
            </p>
          </div>
        </div>

        {/* Action button cluster */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-250 hover:border-orange-500/40 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-950 transition flex items-center gap-1.5 cursor-pointer leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-2xs"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-650" />
                Copied App URL!
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
                Share App URL
              </>
            )}
          </button>
          
          <a
            href="https://github.com/voku/BlindSpotMetaSkillApp"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-orange-50 border border-orange-205 text-orange-700 hover:bg-orange-500 hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-2xs"
          >
            View Source
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Main Dashboard Layout Area */}
      <main className="relative max-w-7xl w-full mx-auto px-4 py-6 flex-1 flex flex-col gap-6 z-10">
        
        {/* Intro informational description of the tool workflow */}
        <section className="p-4 bg-orange-50/50 border border-orange-200/50 rounded-xl flex items-start gap-3 text-xs leading-relaxed max-w-4xl text-slate-700 shadow-sm">
          <HelpCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-slate-900 font-display">How Meta Prompt Generation Works</span>
            <p className="font-sans leading-normal text-slate-600">
              Generate structured, 5-phase "Blind Spot" analysis directives to instruct AI systems using unflinching honesty.
              Refine your prompt's target domain and constraints in **1. Configure Specs**, focusing on the unvarnished truth.
              Review the complete suite of system interaction files in **2. Explore Skill Package**.
            </p>
          </div>
        </section>

        {/* ... */}
        <div className="flex border-b border-slate-200 pb-1 gap-1 select-none overflow-x-auto scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            type="button"
            onClick={() => setActiveTab('specifications')}
            className={`flex items-center gap-2 pb-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition font-display whitespace-nowrap cursor-pointer rounded-t-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              activeTab === 'specifications'
                ? 'border-orange-500 text-orange-655 font-bold bg-white shadow-2xs'
                : 'border-transparent text-slate-450 hover:text-slate-700'
            }`}
          >
            <Settings className="w-4 h-4" />
            1. Configure Specs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('package_preview')}
            className={`flex items-center gap-2 pb-2.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition font-display whitespace-nowrap cursor-pointer rounded-t-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              activeTab === 'package_preview'
                ? 'border-orange-500 text-orange-655 font-bold bg-white shadow-2xs'
                : 'border-transparent text-slate-450 hover:text-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            2. Explore Skill Package
          </button>
        </div>

        {/* Tab content area */}
        <div className="flex-1">
          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Form panel configuring metadata */}
              <div className="xl:col-span-5 space-y-4">
                {validationErrors.length > 0 && (
                  <div className="p-3.5 bg-amber-50/70 border border-amber-300/50 rounded-xl flex items-start gap-2.5 shadow-2xs text-xs relative pr-8 animate-fade-in">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5 animate-bounce" />
                    <div>
                      <div className="font-bold text-amber-800 font-display">Verification Gate Rectified State</div>
                      <ul className="list-disc pl-4 mt-1 text-[11px] text-amber-700/90 space-y-0.5">
                        {validationErrors.map((err, i) => (
                          <li key={i}>{err.message}</li>
                        ))}
                      </ul>
                      <div className="mt-1.5 text-[9px] font-mono text-amber-600">Strict Read-Verify-Write Loop Safeguarded</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setValidationErrors([])}
                      className="absolute top-2 right-2 p-1 text-amber-400 hover:text-amber-700 hover:bg-amber-100/50 rounded-md transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <SkillForm 
                  skill={skill} 
                  onChange={handleSkillChange} 
                  onResetPreset={handleResetPreset}
                />
              </div>

              {/* Dynamic live description panel */}
              <div className="xl:col-span-7 bg-white p-6 rounded-xl border border-slate-200/80 space-y-5 shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest font-mono text-orange-600 font-bold">Dynamic Prompt Structure</span>
                  <h3 className="text-lg font-display font-bold text-slate-900">Interactive Meta Prompt Drafting</h3>
                  <p className="text-xs text-slate-500 leading-normal font-sans">
                    As you toggle properties on the left, your meta prompt updates in real-time. Below is a live preview of the generated system operating contract.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 font-mono text-[11px] leading-relaxed text-slate-800 overflow-auto max-h-[500px] border border-slate-200/85 shadow-inner">
                  <div className="text-slate-550 mb-3 border-b border-slate-200 pb-2 flex items-center justify-between">
                    <span>PREVIEWING: Generated Meta Prompt</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-600 font-semibold font-sans">Autosaved</span>
                  </div>
                  <pre className="whitespace-pre-wrap">{skillMarkdown}</pre>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab('package_preview')}
                    className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-650 hover:from-orange-550 hover:to-red-600 text-white text-xs font-semibold rounded-lg transition shadow-md shadow-orange-500/10 flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-550 focus-visible:ring-offset-2"
                  >
                    Review Meta Prompt →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'package_preview' && (
            <PackageBrowser files={files} skillName={skill.name} />
          )}
        </div>

      </main>

      {/* Humble literal footer credits (Avoiding Tech-Larping metadata slop as mandated) */}
      <footer className="relative max-w-7xl w-full mx-auto px-4 py-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 z-10 font-sans">
        <div className="flex items-center gap-2">
          <span>Der Griller</span>
          <span className="text-slate-300">•</span>
          <span>Static Vite build</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-slate-300 select-none">|</span>
          <span className="font-mono text-[10px] text-slate-400">GitHub Pages ready</span>
        </div>
      </footer>

    </div>
  );
}
