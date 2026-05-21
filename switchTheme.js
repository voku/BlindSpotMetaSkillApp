const fs = require('fs');
const files = [
  'src/App.tsx',
  'src/components/SkillForm.tsx',
  'src/components/PackageBrowser.tsx',
  'src/components/RoastTerminal.tsx'
];

const map = {
  'bg-slate-950': 'bg-slate-50',
  'bg-slate-950/20': 'bg-white',
  'bg-slate-950/40': 'bg-white',
  'bg-slate-950/50': 'bg-white',
  'bg-slate-950/60': 'bg-white',
  'bg-slate-950/80': 'bg-white',

  'bg-slate-900': 'bg-white',
  'bg-slate-900/30': 'bg-slate-50',
  'bg-slate-900/40': 'bg-slate-50',
  'bg-slate-900/60': 'bg-slate-50',
  'bg-slate-900/80': 'bg-slate-50',

  'bg-slate-800': 'bg-slate-100',
  'bg-slate-800/80': 'bg-white',
  'bg-slate-800/50': 'bg-white',

  'border-slate-900': 'border-slate-200',
  'border-slate-900/60': 'border-slate-200',
  'border-slate-900/80': 'border-slate-200',

  'border-slate-800': 'border-slate-200',
  'border-slate-800/80': 'border-slate-200',
  'border-slate-800/60': 'border-slate-200',
  'border-slate-800/50': 'border-slate-200',

  'border-slate-700': 'border-slate-300',

  'text-slate-100': 'text-slate-900',
  'text-slate-200': 'text-slate-800',
  'text-slate-300': 'text-slate-700',
  'text-slate-400': 'text-slate-600',
  'text-slate-500': 'text-slate-500', 
  'text-slate-600': 'text-slate-400',
  'text-slate-700': 'text-slate-500',
  'text-slate-800': 'text-slate-400',

  'placeholder-slate-600': 'placeholder-slate-400',
  'placeholder-slate-700': 'placeholder-slate-400',

  'hover:bg-slate-900': 'hover:bg-slate-100',
  'hover:bg-slate-900/30': 'hover:bg-slate-50',
  'hover:bg-slate-900/40': 'hover:bg-slate-50',
  'hover:bg-slate-800': 'hover:bg-slate-100',

  'hover:text-slate-200': 'hover:text-slate-900',
  'hover:text-slate-300': 'hover:text-slate-800',
  'hover:border-slate-700': 'hover:border-slate-300',

  'from-indigo-900/10': 'from-indigo-100/40',
  
  'bg-indigo-600/10': 'bg-indigo-50',
  'bg-indigo-600/15': 'bg-indigo-50',
  'bg-indigo-600/20': 'bg-indigo-50',
  'bg-indigo-500/10': 'bg-indigo-100',

  'border-indigo-500/35': 'border-indigo-200',
  'border-indigo-500/30': 'border-indigo-200',
  'border-indigo-500/80': 'border-indigo-300',
  'border-indigo-500': 'border-indigo-400',

  'text-indigo-100': 'text-indigo-800',
  'text-indigo-200': 'text-indigo-600',
  'text-indigo-300': 'text-indigo-700',
  'text-indigo-400': 'text-indigo-600',
  'fill-indigo-200': 'fill-indigo-600',

  'bg-amber-500/10': 'bg-amber-50',
  'border-amber-500/20': 'border-amber-200',
  'border-amber-500/30': 'border-amber-200',
  'text-amber-400': 'text-amber-600',
  'text-amber-500': 'text-amber-700',
  'bg-amber-600/20': 'bg-amber-100',

  'bg-red-950/20': 'bg-red-50',
  'border-red-500/30': 'border-red-200',
  'text-red-200': 'text-red-800',
  'text-red-400': 'text-red-600',

  'selection:bg-indigo-500/30': 'selection:bg-indigo-200',
  'selection:bg-indigo-500/20': 'selection:bg-indigo-100',

  'prose-invert': ''
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  
  for (const key of keys) {
    const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(^|[\\s"\'\\\`{}<>])(${escapedKey})(?=$|[\\s"\'\\\`{}<>])`, 'g');
    content = content.replace(regex, `$1${map[key]}`);
  }
  fs.writeFileSync(file, content);
});
