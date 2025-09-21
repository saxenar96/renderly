'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChallengeDetail } from '../../../../components/ChallengeDetail';

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.id as string;

  // Mock challenge data - in a real app, this would come from an API
  const challenges = {
    'create-reusable-button': {
      id: 'create-reusable-button',
      title: 'Create a Reusable Button Component',
      difficulty: 'Easy' as const,
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
      starterCode: `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = ''
}) => {
  // Your implementation here
  return (
    <button
      className={\`\${className}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};`
    },
    'build-todo-list': {
      id: 'build-todo-list',
      title: 'Build a Todo List App',
      difficulty: 'Medium' as const,
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
      starterCode: `import React, { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  // Your implementation here
  
  return (
    <div className="todo-app">
      {/* Your JSX here */}
    </div>
  );
};`
    },
    'create-data-table': {
      id: 'create-data-table',
      title: 'Create a Data Table with Sorting',
      difficulty: 'Hard' as const,
      techStack: 'TypeScript',
      description: 'Build a responsive data table component with sorting, filtering, and pagination capabilities.',
      tags: ['tables', 'pagination', 'sorting', 'performance'],
      isNew: false,
      requirements: [
        'Create a reusable DataTable component',
        'Implement column sorting (ascending/descending)',
        'Add search/filter functionality',
        'Include pagination controls',
        'Make it responsive for mobile',
        'Optimize for performance with large datasets'
      ],
      starterCode: `import React, { useState, useMemo } from 'react';

interface Column<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchable?: boolean;
}

export const DataTable = <T,>({ 
  data, 
  columns, 
  pageSize = 10,
  searchable = true 
}: DataTableProps<T>) => {
  // Your implementation here
  
  return (
    <div className="data-table">
      {/* Your JSX here */}
    </div>
  );
};`
    },
    'build-modal-component': {
      id: 'build-modal-component',
      title: 'Build a Modal Component',
      difficulty: 'Easy' as const,
      techStack: 'React',
      description: 'Create a reusable modal component with backdrop, animations, and accessibility features.',
      tags: ['modals', 'accessibility', 'animations'],
      isNew: false,
      requirements: [
        'Create a reusable Modal component',
        'Add backdrop with click-to-close',
        'Implement smooth animations',
        'Ensure keyboard accessibility (ESC to close)',
        'Focus management and trap focus',
        'Support different sizes and positions'
      ],
      starterCode: `import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  // Your implementation here
  
  return (
    <>
      {/* Your JSX here */}
    </>
  );
};`
    },
    'implement-infinite-scroll': {
      id: 'implement-infinite-scroll',
      title: 'Implement Infinite Scroll',
      difficulty: 'Medium' as const,
      techStack: 'React',
      description: 'Build an infinite scroll component that efficiently loads and displays large datasets.',
      tags: ['performance', 'scroll', 'data-fetching'],
      isNew: false,
      requirements: [
        'Create an infinite scroll component',
        'Implement intersection observer for performance',
        'Add loading states and error handling',
        'Support different item heights',
        'Include pull-to-refresh functionality',
        'Optimize re-renders'
      ],
      starterCode: `import React, { useState, useEffect, useCallback } from 'react';

interface InfiniteScrollProps<T> {
  data: T[];
  loadMore: () => Promise<void>;
  hasMore: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export const InfiniteScroll = <T,>({
  data,
  loadMore,
  hasMore,
  renderItem,
  loadingComponent
}: InfiniteScrollProps<T>) => {
  // Your implementation here
  
  return (
    <div className="infinite-scroll">
      {/* Your JSX here */}
    </div>
  );
};`
    },
    'create-drag-drop-interface': {
      id: 'create-drag-drop-interface',
      title: 'Create a Drag & Drop Interface',
      difficulty: 'Hard' as const,
      techStack: 'TypeScript',
      description: 'Implement a drag and drop interface with reorderable lists and visual feedback.',
      tags: ['drag-drop', 'interactions', 'animations'],
      isNew: false,
      requirements: [
        'Implement drag and drop functionality',
        'Add visual feedback during drag',
        'Support reordering of items',
        'Include drop zones and validation',
        'Add smooth animations',
        'Ensure accessibility compliance'
      ],
      starterCode: `import React, { useState, useRef } from 'react';

interface DragDropItem {
  id: string;
  content: React.ReactNode;
}

interface DragDropListProps {
  items: DragDropItem[];
  onReorder: (items: DragDropItem[]) => void;
  renderItem: (item: DragDropItem, isDragging: boolean) => React.ReactNode;
}

export const DragDropList: React.FC<DragDropListProps> = ({
  items,
  onReorder,
  renderItem
}) => {
  // Your implementation here
  
  return (
    <div className="drag-drop-list">
      {/* Your JSX here */}
    </div>
  );
};`
    }
  };

  const challenge = challenges[challengeId as keyof typeof challenges];

  if (!challenge) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Challenge Not Found</h1>
          <p className="text-muted-foreground mb-8">The challenge you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Challenges
          </button>
        </div>
      </div>
    );
  }

  return <ChallengeDetail challenge={challenge} />;
}
