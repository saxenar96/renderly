'use client';

import React, { useState, useEffect } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { SandpackFiles, SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  techStack: string;
  description: string;
  tags: string[];
  isNew?: boolean;
  requirements: string[];
  starterCode: string;
  sandpackTemplate?: SandpackPredefinedTemplate;
  sandpackFiles?: SandpackFiles;
}

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
  const createSandpackFiles = (challenge: Challenge): SandpackFiles => {
    const template = challenge.sandpackTemplate || getTemplate(challenge.techStack);
    
    // Use custom files if provided, otherwise create base files
    if (challenge.sandpackFiles) {
      return challenge.sandpackFiles;
    }

    // Base files for different templates
    const baseFiles: Record<string, SandpackFiles> = {
      'react-ts': {
        '/App.tsx': {
          code: `${challenge.starterCode}

import './App.css';`,
        },
        '/App.css': {
          code: `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

input, textarea {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item.completed {
  text-decoration: line-through;
  color: #666;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.data-table th {
  background-color: #f2f2f2;
  cursor: pointer;
}

.data-table th:hover {
  background-color: #e6e6e6;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.infinite-scroll {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
}

.drag-drop-list {
  min-height: 200px;
  border: 2px dashed #ddd;
  padding: 20px;
  border-radius: 8px;
}

.drag-item {
  padding: 10px;
  margin: 5px 0;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: move;
}

.drag-item.dragging {
  opacity: 0.5;
  transform: rotate(5deg);
}

.drop-zone {
  background: #e3f2fd;
  border-color: #2196f3;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}`,
        },
        // Hidden files - these won't show in tabs but are needed for the app to work
        '/index.tsx': {
          code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);`,
          hidden: true,
        },
        '/index.html': {
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${challenge.title}</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
          hidden: true,
        },
      },
      'vanilla-ts': {
        '/index.ts': {
          code: challenge.starterCode,
        },
        '/index.html': {
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${challenge.title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${challenge.title}</h1>
    <div id="app"></div>
  </div>
  <script src="/index.ts"></script>
</body>
</html>`,
        },
      },
      'vanilla': {
        '/index.js': {
          code: challenge.starterCode,
        },
        '/index.html': {
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${challenge.title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${challenge.title}</h1>
    <div id="app"></div>
  </div>
  <script src="/index.js"></script>
</body>
</html>`,
        },
      },
      'vue-ts': {
        '/src/App.vue': {
          code: `<template>
  <div id="app">
    ${challenge.starterCode}
  </div>
</template>

<script setup lang="ts">
// Your Vue component logic here
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>`,
        },
      },
      'angular': {
        '/src/app/app.component.ts': {
          code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <div class="container">
      <h1>${challenge.title}</h1>
      ${challenge.starterCode}
    </div>
  \`,
  styles: [\`
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  \`]
})
export class AppComponent {
  title = '${challenge.title}';
}`,
        },
      },
    };

    return baseFiles[template] || baseFiles['react-ts'];
  };

  const template = challenge.sandpackTemplate || getTemplate(challenge.techStack);
  const files = createSandpackFiles(challenge);

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