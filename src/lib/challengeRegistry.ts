import { SandpackFiles } from '@codesandbox/sandpack-react';

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
      'App.tsx': `import React from 'react';

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

export default App;`,
      'App.css': `body {
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
}`
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
      'App.tsx': `import React, { useState, useEffect } from 'react';

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

export default TodoApp;`,
      'App.css': `body {
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
}`
    }
  }
  // Add other challenges here...
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