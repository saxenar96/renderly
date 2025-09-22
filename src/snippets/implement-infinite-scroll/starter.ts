export const appStarterCode = `import React, { useState, useEffect, useCallback } from 'react';

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
  // TODO: Implement infinite scroll functionality
  // 1. Use intersection observer to detect when user scrolls near bottom
  // 2. Handle loading states and error handling
  // 3. Support custom loading components
  // 4. Optimize performance with proper cleanup
  // 5. Add proper TypeScript generics for data types
  // 6. Include proper error boundaries
  
  return (
    <div className="infinite-scroll">
      {data.map((item, index) => (
        <div key={index}>
          {renderItem(item, index)}
        </div>
      ))}
      
      {hasMore && (
        <div className="loading">
          {loadingComponent || 'Loading...'}
        </div>
      )}
    </div>
  );
};`;

export const cssStarterCode = `body {
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

.infinite-scroll {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
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
}`;
