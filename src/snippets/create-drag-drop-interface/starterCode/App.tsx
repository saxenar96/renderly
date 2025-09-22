export const appStarterCode = `import React, { useState, useRef } from 'react';

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
}`;