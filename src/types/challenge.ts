import { SandpackFiles, SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';

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
  sandpackTemplate?: SandpackPredefinedTemplate;
  sandpackFiles?: SandpackFiles;
}
