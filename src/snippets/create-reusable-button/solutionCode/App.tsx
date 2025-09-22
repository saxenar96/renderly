import React from 'react';

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
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
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

export default App;