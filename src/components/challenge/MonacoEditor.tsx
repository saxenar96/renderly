'use client';

import React, { useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  height?: string;
  options?: any;
}

export function MonacoEditor({ 
  value, 
  onChange, 
  language = 'typescript',
  height = '100%',
  options = {}
}: MonacoEditorProps) {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure TypeScript compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types']
    });

    // Configure JavaScript language features
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types']
    });

    // Add React types for TypeScript
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare module 'react' {
        export = React;
        export as namespace React;
        export interface Component<P = {}, S = {}> {
          render(): ReactElement<any> | null;
        }
        export interface ReactElement<P = any> {
          type: any;
          props: P;
          key: string | number | null;
        }
        export interface ComponentType<P = {}> {
          (props: P, context?: any): ReactElement<any> | null;
        }
        export function createElement<P>(
          type: string | ComponentType<P>,
          props?: P & { children?: any },
          ...children: any[]
        ): ReactElement<P>;
        export const Fragment: ComponentType<{ children?: any }>;
      }`,
      'file:///node_modules/@types/react/index.d.ts'
    );

    // Add React types for JavaScript
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      `declare module 'react' {
        export = React;
        export as namespace React;
        export interface Component<P = {}, S = {}> {
          render(): ReactElement<any> | null;
        }
        export interface ReactElement<P = any> {
          type: any;
          props: P;
          key: string | number | null;
        }
        export interface ComponentType<P = {}> {
          (props: P, context?: any): ReactElement<any> | null;
        }
        export function createElement<P>(
          type: string | ComponentType<P>,
          props?: P & { children?: any },
          ...children: any[]
        ): ReactElement<P>;
        export const Fragment: ComponentType<{ children?: any }>;
      }`,
      'file:///node_modules/@types/react/index.d.ts'
    );

    // Configure editor options
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      wordWrap: 'on',
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      renderWhitespace: 'selection',
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        indentation: true
      }
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      // This will be handled by the parent component
      const event = new CustomEvent('runCode');
      window.dispatchEvent(event);
    });
  };

  const defaultOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line' as const,
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    wordWrap: 'on' as const,
    tabSize: 2,
    insertSpaces: true,
    renderWhitespace: 'selection' as const,
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true
    },
    ...options
  };

  return (
    <div className="h-full w-full">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={defaultOptions}
      />
    </div>
  );
}
