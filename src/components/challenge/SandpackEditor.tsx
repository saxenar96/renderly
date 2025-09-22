'use client';

import React, { useState, useEffect } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { SandpackFiles, SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';
import { createSandpackFiles } from '../../lib/challengeRegistry';
import { Challenge } from '../../types/challenge';

interface SandpackEditorProps {
  challenge: Challenge;
}

export function SandpackEditor({ challenge }: SandpackEditorProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-2/3 border-r border-border bg-card">
        <div className="h-full flex flex-col">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-card-foreground">Code Editor & Preview</h2>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-muted-foreground">Loading editor...</div>
          </div>
        </div>
      </div>
    );
  }
  
  // Determine the appropriate Sandpack template based on tech stack
  const getTemplate = (techStack: string): SandpackPredefinedTemplate => {
    switch (techStack.toLowerCase()) {
      case 'react':
        return 'react-ts';
      case 'typescript':
        return 'vanilla-ts';
      case 'javascript':
        return 'vanilla';
      case 'vue':
        return 'vue-ts';
      case 'angular':
        return 'angular';
      default:
        return 'react-ts';
    }
  };

  // Create files for Sandpack based on the challenge
  const createSandpackFilesForChallenge = (challenge: Challenge): SandpackFiles => {
    // Use custom files if provided, otherwise use snippet files
    if (challenge.sandpackFiles) {
      return challenge.sandpackFiles;
    }

    // Use snippet files from the registry
    return createSandpackFiles(challenge, false);
  };

  const template = challenge.sandpackTemplate || getTemplate(challenge.techStack);
  const files = createSandpackFilesForChallenge(challenge);

  return (
    <div className="w-2/3 border-r border-border bg-card">
      <div className="h-full flex flex-col">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-card-foreground">Code Editor & Preview</h2>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div className="h-full sandpack-container">
            <Sandpack
              template={template}
              files={files}
              options={{
                showNavigator: false,
                showRefreshButton: true,
                showTabs: true,
                showLineNumbers: true,
                showInlineErrors: true,
                wrapContent: false,
                editorHeight: '100%',
                editorWidthPercentage: 50,
                resizablePanels: true,
                autorun: true,
                recompileMode: 'delayed',
                recompileDelay: 300,
                showConsole: false,
                showConsoleButton: false,
              }}
              theme={mounted && resolvedTheme === 'dark' ? 'dark' : 'light'}
              customSetup={{
                dependencies: {
                  // Add common dependencies based on template
                  ...(template === 'react-ts' && {
                    'react': '^18.0.0',
                    'react-dom': '^18.0.0',
                    '@types/react': '^18.0.0',
                    '@types/react-dom': '^18.0.0',
                  }),
                  ...(template === 'vue-ts' && {
                    'vue': '^3.0.0',
                    '@vue/runtime-dom': '^3.0.0',
                  }),
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}