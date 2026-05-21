import React, { useState, useEffect } from 'react';
import { GeneratedFile } from '../types';
import { Copy, Check, Download, Layers, Folder, FolderOpen, FileText, ChevronRight, Menu } from 'lucide-react';

interface PackageBrowserProps {
  files: GeneratedFile[];
  skillName: string;
}

export default function PackageBrowser({ files, skillName }: PackageBrowserProps) {
  const [copied, setCopied] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string>('');

  // Sync selected path if files list changes or initialization
  useEffect(() => {
    if (files.length > 0) {
      if (!selectedPath || !files.some(f => f.path === selectedPath)) {
        setSelectedPath(files[0].path);
      }
    } else {
      setSelectedPath('');
    }
  }, [files, selectedPath]);

  const activeSelectedFile = files.find(f => f.path === selectedPath) || files[0] || null;

  const handleCopy = () => {
    if (activeSelectedFile) {
      navigator.clipboard.writeText(activeSelectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDisplayPath = (filePath: string) => {
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  };

  const downloadFile = () => {
    if (!activeSelectedFile) return;
    const blob = new Blob([activeSelectedFile.content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', getDisplayPath(activeSelectedFile.path));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simple folder tree grouping helper
  const renderFileTree = () => {
    // Group files by root or subdir
    return (
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono font-bold text-slate-400 tracking-wider">
            <span className="uppercase">{skillName || 'SKILL PACKAGE'}</span>
          </div>
          <div className="mt-1 space-y-0.5">
            {files.map((file) => {
              const isActive = file.path === selectedPath;
              const isExample = file.path.includes('/examples/');
              const isTemplate = file.path.includes('/templates/');
              
              let depthClass = "pl-2";
              if (isExample || isTemplate) {
                depthClass = "pl-6";
              }

              return (
                <button
                  key={file.path}
                  type="button"
                  onClick={() => setSelectedPath(file.path)}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs font-mono rounded-md transition ${
                    isActive
                      ? 'bg-orange-50 text-orange-850 font-bold border-l-2 border-orange-500 pl-2 lg:pl-2'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                  } ${depthClass}`}
                >
                  <FileText className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-orange-550' : 'text-slate-400'}`} />
                  <span className="truncate">{getDisplayPath(file.path)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="package-browser-parent" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[80vh] min-h-[550px]">
      
      {/* Sidebar File/Folder tree list on desktop */}
      <div className="hidden lg:block lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 overflow-y-auto shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
          <Layers className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-bold font-display uppercase tracking-wider text-slate-700">Skill Files Explorer</span>
        </div>
        {renderFileTree()}
      </div>

      {/* File viewer/editor panel */}
      <div className="lg:col-span-9 bg-white rounded-xl border border-slate-200 flex flex-col justify-between h-full overflow-hidden shadow-sm">
        
        {/* Mobile Dropdown Navigator */}
        <div className="lg:hidden bg-slate-50/50 px-4 py-2 border-b border-slate-100 flex items-center justify-between gap-3">
          <label htmlFor="mobile-file-select" className="text-[10px] font-mono font-bold text-slate-450 uppercase whitespace-nowrap">File Selector:</label>
          <select
            id="mobile-file-select"
            className="flex-1 bg-white border border-slate-200 rounded px-2 py-1 text-xs font-mono text-slate-700 focus:outline-none focus:border-orange-500"
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
          >
            {files.map(f => (
              <option key={f.path} value={f.path}>{f.path}</option>
            ))}
          </select>
        </div>

        {/* Header toolbar */}
        <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider hidden sm:inline">ACTIVE:</span>
            <span className="text-xs font-mono font-bold text-orange-700 break-all">{activeSelectedFile?.path || 'Der Griller'}</span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto justify-end">
            {activeSelectedFile && (
              <button
                type="button"
                onClick={downloadFile}
                title="Download this file"
                className="p-1 px-2.5 bg-white border border-slate-200 hover:border-orange-500/35 hover:bg-slate-50 text-slate-700 text-[10px] font-semibold rounded-md transition flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-500 shadow-2xs"
              >
                <Download className="w-3 h-3 text-orange-600 font-bold" />
                Raw Download
              </button>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="p-1 px-2.5 bg-gradient-to-r from-orange-600 to-red-650 hover:from-orange-550 hover:to-red-600 text-white text-[10px] font-semibold rounded-md transition flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 shadow shadow-orange-500/10 active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-green-200" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy File Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main content body */}
        <div className="flex-1 overflow-auto bg-[#fdfdfc] p-4 font-mono text-xs leading-relaxed text-slate-800">
          {activeSelectedFile ? (
            <pre className="whitespace-pre-wrap selection:bg-orange-100 selection:text-orange-900">
              {activeSelectedFile.content}
            </pre>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
              <Layers className="w-8 h-8 opacity-30 animate-pulse text-orange-500" />
              <span>No files generated. Configure the specifications panel first.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
