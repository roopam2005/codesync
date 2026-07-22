// Output panel showing code execution results
import { Terminal, X } from 'lucide-react';
import useEditorStore from '../../store/useEditorStore.js';
import IconButton from '../ui/IconButton.jsx';

const OutputPanel = () => {
  const { output, error, isExecuting, clearOutput } = useEditorStore();

  const hasContent = output || error;

  return (
    <div className="glass rounded-2xl flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-aurora-cyan" />
          <span className="text-lg text-white">OUTPUT</span>
          {isExecuting && (
            <span className="text-sm text-aurora-orange animate-glow-pulse">
              Running...
            </span>
          )}
        </div>

        {hasContent && (
          <IconButton
            icon={<X className="w-4 h-4" />}
            onClick={clearOutput}
            variant="default"
            size="sm"
            tooltip="Clear output"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 bg-black/20">
        {isExecuting ? (
          <div className="flex flex-col items-center justify-center h-full text-text-secondary">
            <div className="w-8 h-8 border-2 border-aurora-purple/30 border-t-aurora-purple rounded-full animate-spin mb-3" />
            <p>Executing your code...</p>
          </div>
        ) : error ? (
          <pre
            className="whitespace-pre-wrap break-words text-base leading-relaxed"
            style={{
              color: '#f87171',
              fontFamily: '"Fira Code", "Consolas", monospace',
              fontSize: '14px',
            }}
          >
            {error}
          </pre>
        ) : output ? (
          <pre
            className="whitespace-pre-wrap break-words leading-relaxed"
            style={{
              color: '#e2e8f0',
              fontFamily: '"Fira Code", "Consolas", monospace',
              fontSize: '14px',
            }}
          >
            {output}
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-text-muted text-center">
            <Terminal className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-lg">Click RUN to execute your code</p>
            <p className="text-sm mt-2">Output will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;