'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChallengeDetail } from '../../../../components/ChallengeDetail';

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.id as string;

  // Mock challenge data - in a real app, this would come from an API
  const challenges = [
    {
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

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = ''
}) => {
  // Your implementation here
  const baseClasses = 'font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';
  
  const classes = \`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${disabledClasses} \${className}\`;
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  
  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const App: React.FC = () => {
  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="container">
      <h1>Button Component Demo</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Primary Buttons</h2>
          <div className="space-x-2">
            <Button onClick={handleButtonClick}>Click me</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Secondary Buttons</h2>
          <div className="space-x-2">
            <Button variant="secondary" onClick={handleButtonClick}>Secondary</Button>
            <Button variant="secondary" size="sm">Small Secondary</Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Outline Buttons</h2>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleButtonClick}>Outline</Button>
            <Button variant="outline" size="sm">Small Outline</Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Disabled Buttons</h2>
          <div className="space-x-2">
            <Button disabled>Disabled Primary</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;`
    },
    {
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

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newTodo, setNewTodo] = useState('');
  
  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
  }, []);
  
  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };
  
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;
  
  return (
    <div className="container">
      <h1>Todo List App</h1>
      
      <div className="space-y-4">
        {/* Add Todo Form */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={\`px-3 py-1 rounded-md text-sm \${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}\`}
          >
            All ({todos.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={\`px-3 py-1 rounded-md text-sm \${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}\`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={\`px-3 py-1 rounded-md text-sm \${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}\`}
          >
            Completed ({completedCount})
          </button>
        </div>
        
        {/* Todo List */}
        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {filter === 'all' ? 'No todos yet. Add one above!' : 
               filter === 'active' ? 'No active todos!' : 'No completed todos!'}
            </p>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-3"
                />
                <span className={\`flex-1 \${todo.completed ? 'line-through text-gray-500' : ''}\`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;`
    },
    {
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

const DataTable = <T,>({ 
  data, 
  columns, 
  pageSize = 10,
  searchable = true 
}: DataTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item =>
      columns.some(column => {
        const value = item[column.key];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);
  
  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);
  
  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);
  
  const totalPages = Math.ceil(sortedData.length / pageSize);
  
  const handleSort = (key: keyof T) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return prev.direction === 'asc' 
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };
  
  return (
    <div className="data-table">
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={\`px-4 py-2 text-left border-b \${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}\`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {column.title}
                    {column.sortable && sortConfig?.key === column.key && (
                      <span className="text-blue-600">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-2 border-b">
                    {column.render 
                      ? column.render(item[column.key], item)
                      : String(item[column.key] || '')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

// Sample data for demonstration
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, department: 'Sales' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 29, department: 'Engineering' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 38, department: 'HR' },
  { id: 6, name: 'Diana Davis', email: 'diana@example.com', age: 31, department: 'Marketing' },
  { id: 7, name: 'Eve Miller', email: 'eve@example.com', age: 27, department: 'Engineering' },
  { id: 8, name: 'Frank Garcia', email: 'frank@example.com', age: 42, department: 'Sales' },
];

const columns = [
  { key: 'name' as keyof typeof sampleData[0], title: 'Name', sortable: true },
  { key: 'email' as keyof typeof sampleData[0], title: 'Email', sortable: true },
  { key: 'age' as keyof typeof sampleData[0], title: 'Age', sortable: true },
  { key: 'department' as keyof typeof sampleData[0], title: 'Department', sortable: true },
];

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Data Table with Sorting & Pagination</h1>
      <DataTable 
        data={sampleData} 
        columns={columns} 
        pageSize={5}
        searchable={true}
      />
    </div>
  );
};

export default App;`
    },
    {
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
    {
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
    {
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
  ];

  const challenge = challenges.find(c => c.id === challengeId);

  if (!challenge) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Challenge Not Found</h1>
          <p className="text-muted-foreground mb-8">The challenge you&apos;re looking for doesn&apos;t exist.</p>
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
