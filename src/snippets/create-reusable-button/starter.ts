export const appSolutionCode = `import React from 'react';

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
  // TODO: Implement the Button component
  // 1. Create base styles for the button
  // 2. Add variant-specific styles (primary, secondary, outline)
  // 3. Add size-specific styles (sm, md, lg)
  // 4. Handle disabled state
  // 5. Add hover and focus states
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`\${className}\`}
    >
      {children}
    </button>
  );
};

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Button Component Demo</h1>
      
      <div className="demo-section">
        <h2>Variants</h2>
        <div className="button-group">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Sizes</h2>
        <div className="button-group">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>States</h2>
        <div className="button-group">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
};

export default App;`;

export const cssSolutionCode = `body {
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

.demo-section {
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

h2 {
  color: #555;
  margin-bottom: 15px;
  font-size: 18px;
}`;
