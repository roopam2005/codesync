// Monaco Editor wrapper with custom theme
import Editor from '@monaco-editor/react';
import { useRef } from 'react';
import { socket, SOCKET_EVENTS } from '../../socket/socket.js';
import useEditorStore from '../../store/useEditorStore.js';
import useRoomStore from '../../store/useRoomStore.js';

const MonacoEditor = () => {
  const { code, language, setCode } = useEditorStore();
  const { roomId } = useRoomStore();
  const editorRef = useRef(null);
  const isRemoteChange = useRef(false);

  // Custom CodeSync theme
  const handleBeforeMount = (monaco) => {
    monaco.editor.defineTheme('codesync-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        // Comments
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        // Keywords
        { token: 'keyword', foreground: 'ff79c6' },
        { token: 'keyword.control', foreground: 'ff79c6' },
        // Strings
        { token: 'string', foreground: 'f1fa8c' },
        // Numbers
        { token: 'number', foreground: 'bd93f9' },
        // Functions
        { token: 'function', foreground: '50fa7b' },
        // Variables
        { token: 'variable', foreground: 'f8f8f2' },
        // Types
        { token: 'type', foreground: '8be9fd' },
        // Constants
        { token: 'constant', foreground: 'bd93f9' },
        // Operators
        { token: 'operator', foreground: 'ff79c6' },
        // Delimiters
        { token: 'delimiter', foreground: 'f8f8f2' },
      ],
      colors: {
        'editor.background': '#0a0a12',
        'editor.foreground': '#f8f8f2',
        'editor.lineHighlightBackground': '#1a1a2e',
        'editor.selectionBackground': '#a855f740',
        'editor.inactiveSelectionBackground': '#a855f720',
        'editorCursor.foreground': '#a855f7',
        'editorLineNumber.foreground': '#4a4a5e',
        'editorLineNumber.activeForeground': '#a855f7',
        'editor.selectionHighlightBackground': '#a855f725',
        'editorIndentGuide.background': '#1e1e2e',
        'editorIndentGuide.activeBackground': '#a855f7',
        'editorBracketMatch.background': '#a855f730',
        'editorBracketMatch.border': '#a855f7',
        'scrollbarSlider.background': '#a855f740',
        'scrollbarSlider.hoverBackground': '#a855f760',
        'scrollbarSlider.activeBackground': '#a855f780',
        'editorWidget.background': '#12121a',
        'editorWidget.border': '#a855f740',
        'editorSuggestWidget.background': '#12121a',
        'editorSuggestWidget.border': '#a855f740',
        'editorSuggestWidget.selectedBackground': '#a855f730',
      },
    });
  };

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.setTheme('codesync-dark');
    editor.focus();
  };

  const handleChange = (value) => {
    if (isRemoteChange.current) {
      isRemoteChange.current = false;
      return;
    }

    setCode(value || '');

    if (roomId) {
      socket.emit(SOCKET_EVENTS.CODE_CHANGE, {
        roomId,
        code: value || '',
      });
    }
  };

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border border-white/10">
      <Editor
        height="100%"
        language={language}
        value={code}
        theme="codesync-dark"
        beforeMount={handleBeforeMount}
        onMount={handleEditorMount}
        onChange={handleChange}
        options={{
          fontSize: 15,
          fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 20, bottom: 20 },
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          lineNumbersMinChars: 3,
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          contextmenu: true,
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
        }}
        loading={
          <div className="h-full flex items-center justify-center bg-base-surface">
            <p className="text-text-secondary text-xl">Loading editor...</p>
          </div>
        }
      />
    </div>
  );
};

export default MonacoEditor;