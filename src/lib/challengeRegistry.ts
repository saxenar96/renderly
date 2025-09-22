import { SandpackFiles } from '@codesandbox/sandpack-react';
import { appStarterCode as createReusableButtonAppStarterCode, cssStarterCode as createReusableButtonCssStarterCode } from '../snippets/create-reusable-button/starter';
import { appSolutionCode as createReusableButtonAppSolutionCode, cssSolutionCode as createReusableButtonCssSolutionCode } from '../snippets/create-reusable-button/solution';
import { appStarterCode as buildTodoListAppStarterCode, cssStarterCode as buildTodoListCssStarterCode } from '../snippets/build-todo-list/starter';
import { appSolutionCode as buildTodoListAppSolutionCode, cssSolutionCode as buildTodoListCssSolutionCode } from '../snippets/build-todo-list/solution';
import { appStarterCode as buildModalComponentAppStarterCode, cssStarterCode as buildModalComponentCssStarterCode } from '../snippets/build-modal-component/starter';
import { appSolutionCode as buildModalComponentAppSolutionCode, cssSolutionCode as buildModalComponentCssSolutionCode } from '../snippets/build-modal-component/solution';
import { appStarterCode as createDataTableAppStarterCode, cssStarterCode as createDataTableCssStarterCode } from '../snippets/create-data-table/starter';
import { appSolutionCode as createDataTableAppSolutionCode, cssSolutionCode as createDataTableCssSolutionCode } from '../snippets/create-data-table/solution';
import { appStarterCode as createDragDropInterfaceAppStarterCode, cssStarterCode as createDragDropInterfaceCssStarterCode } from '../snippets/create-drag-drop-interface/starter';
import { appSolutionCode as createDragDropInterfaceAppSolutionCode, cssSolutionCode as createDragDropInterfaceCssSolutionCode } from '../snippets/create-drag-drop-interface/solution';
import { appStarterCode as implementInfiniteScrollAppStarterCode, cssStarterCode as implementInfiniteScrollCssStarterCode } from '../snippets/implement-infinite-scroll/starter';
import { appSolutionCode as implementInfiniteScrollAppSolutionCode, cssSolutionCode as implementInfiniteScrollCssSolutionCode } from '../snippets/implement-infinite-scroll/solution';

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  techStack: string;
  description: string;
  tags: string[];
  isNew?: boolean;
  requirements: string[];
  starterCode: {
    'App.tsx': string;
    'App.css': string;
  };
  solutionCode?: {
    'App.tsx': string;
    'App.css': string;
  };
}

export const challengeRegistry: Record<string, Challenge> = {
  'create-reusable-button': {
    id: 'create-reusable-button',
    title: 'Create a Reusable Button Component',
    difficulty: 'Easy',
    techStack: 'React',
    description: 'Create a reusable Button component that accepts different variants, sizes, and states.',
    tags: ['components', 'typescript', 'props'],
    isNew: true,
    requirements: [
      'Create a Button component with TypeScript',
      'Support different variants (primary, secondary, outline)',
      'Support different sizes (sm, md, lg)',
      'Include disabled state',
      'Add proper TypeScript interfaces',
      'Include hover and focus states'
    ],
    starterCode: {
      'App.tsx': createReusableButtonAppStarterCode,
      'App.css': createReusableButtonCssStarterCode
    },
    solutionCode: {
      'App.tsx': createReusableButtonAppSolutionCode,
      'App.css': createReusableButtonCssSolutionCode
    }
  },
  'build-todo-list': {
    id: 'build-todo-list',
    title: 'Build a Todo List App',
    difficulty: 'Medium',
    techStack: 'React',
    description: 'Implement a complete todo list with add, edit, delete, and filter functionality using React hooks.',
    tags: ['hooks', 'state', 'forms', 'localStorage'],
    isNew: false,
    requirements: [
      'Create a todo list with add functionality',
      'Implement edit and delete operations',
      'Add filter options (all, active, completed)',
      'Persist data using localStorage',
      'Use React hooks (useState, useEffect)',
      'Add proper TypeScript types'
    ],
    starterCode: {
      'App.tsx': buildTodoListAppStarterCode,
      'App.css': buildTodoListCssStarterCode
    },
    solutionCode: {
      'App.tsx': buildTodoListAppSolutionCode,
      'App.css': buildTodoListCssSolutionCode
    }
  },
  'build-modal-component': {
    id: 'build-modal-component',
    title: 'Build a Modal Component',
    difficulty: 'Medium',
    techStack: 'React',
    description: 'Create a reusable Modal component with proper accessibility features, backdrop handling, and different sizes.',
    tags: ['components', 'accessibility', 'portal', 'typescript'],
    isNew: false,
    requirements: [
      'Create a Modal component with TypeScript',
      'Support different sizes (sm, md, lg, xl)',
      'Handle backdrop clicks to close modal',
      'Implement proper focus management',
      'Add keyboard navigation (Escape key)',
      'Include proper ARIA attributes',
      'Support custom content and title'
    ],
    starterCode: {
      'App.tsx': buildModalComponentAppStarterCode,
      'App.css': buildModalComponentCssStarterCode
    },
    solutionCode: {
      'App.tsx': buildModalComponentAppSolutionCode,
      'App.css': buildModalComponentCssSolutionCode
    }
  },
  'create-data-table': {
    id: 'create-data-table',
    title: 'Create a Data Table Component',
    difficulty: 'Hard',
    techStack: 'React',
    description: 'Build a comprehensive data table with sorting, pagination, search, and customizable columns.',
    tags: ['components', 'data', 'pagination', 'sorting', 'typescript'],
    isNew: false,
    requirements: [
      'Create a generic DataTable component with TypeScript',
      'Implement column-based sorting (asc/desc)',
      'Add search functionality across all columns',
      'Implement pagination with configurable page size',
      'Support custom column rendering',
      'Make it fully responsive',
      'Add loading and empty states'
    ],
    starterCode: {
      'App.tsx': createDataTableAppStarterCode,
      'App.css': createDataTableCssStarterCode
    },
    solutionCode: {
      'App.tsx': createDataTableAppSolutionCode,
      'App.css': createDataTableCssSolutionCode
    }
  },
  'create-drag-drop-interface': {
    id: 'create-drag-drop-interface',
    title: 'Create a Drag & Drop Interface',
    difficulty: 'Hard',
    techStack: 'React',
    description: 'Build a drag and drop interface with visual feedback and reordering capabilities.',
    tags: ['components', 'drag-drop', 'interactions', 'typescript'],
    isNew: false,
    requirements: [
      'Create a DragDropList component with TypeScript',
      'Implement drag and drop functionality',
      'Add visual feedback during dragging',
      'Support item reordering',
      'Handle drop zones and validation',
      'Add smooth animations and transitions',
      'Ensure accessibility compliance'
    ],
    starterCode: {
      'App.tsx': createDragDropInterfaceAppStarterCode,
      'App.css': createDragDropInterfaceCssStarterCode
    },
    solutionCode: {
      'App.tsx': createDragDropInterfaceAppSolutionCode,
      'App.css': createDragDropInterfaceCssSolutionCode
    }
  },
  'implement-infinite-scroll': {
    id: 'implement-infinite-scroll',
    title: 'Implement Infinite Scroll',
    difficulty: 'Medium',
    techStack: 'React',
    description: 'Create an infinite scroll component that loads more data as the user scrolls down.',
    tags: ['components', 'performance', 'scroll', 'hooks', 'typescript'],
    isNew: false,
    requirements: [
      'Create an InfiniteScroll component with TypeScript',
      'Implement intersection observer for scroll detection',
      'Handle loading states and error handling',
      'Support custom loading components',
      'Optimize performance with proper cleanup',
      'Add proper TypeScript generics for data types',
      'Include proper error boundaries'
    ],
    starterCode: {
      'App.tsx': implementInfiniteScrollAppStarterCode,
      'App.css': implementInfiniteScrollCssStarterCode
    },
    solutionCode: {
      'App.tsx': implementInfiniteScrollAppSolutionCode,
      'App.css': implementInfiniteScrollCssSolutionCode
    }
  }
};

export function getChallenge(id: string): Challenge | undefined {
  return challengeRegistry[id];
}

export function getAllChallenges(): Challenge[] {
  return Object.values(challengeRegistry);
}

export function createSandpackFiles(challenge: Challenge, useSolution = false): SandpackFiles {
  const code = useSolution && challenge.solutionCode ? challenge.solutionCode : challenge.starterCode;
  
  // Determine the appropriate Sandpack template based on tech stack
  const getTemplate = (techStack: string) => {
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

  const template = getTemplate(challenge.techStack);
  
  // Base files for different templates
  const baseFiles: Record<string, SandpackFiles> = {
    'react-ts': {
      '/App.tsx': {
        code: `${code['App.tsx']}

import './App.css';`,
      },
      '/App.css': {
        code: code['App.css'],
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
        code: code['App.tsx'],
      },
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${challenge.title}</title>
  <style>
    ${code['App.css']}
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
        code: code['App.tsx'],
      },
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${challenge.title}</title>
  <style>
    ${code['App.css']}
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
  };

  return baseFiles[template] || baseFiles['react-ts'];
}