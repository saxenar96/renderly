export const appSolutionCode = `import React, { useState, useRef } from 'react';

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
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragStartIndex = useRef<number | null>(null);
  
  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragStartIndex.current = index;
    setDraggedItem(items[index].id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };
  
  const handleDragLeave = () => {
    setDragOverIndex(null);
  };
  
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (dragStartIndex.current === null || dragStartIndex.current === dropIndex) {
      setDragOverIndex(null);
      setDraggedItem(null);
      dragStartIndex.current = null;
      return;
    }
    
    const newItems = [...items];
    const draggedItem = newItems[dragStartIndex.current];
    
    // Remove the dragged item from its original position
    newItems.splice(dragStartIndex.current, 1);
    
    // Insert the dragged item at the new position
    newItems.splice(dropIndex, 0, draggedItem);
    
    onReorder(newItems);
    
    setDragOverIndex(null);
    setDraggedItem(null);
    dragStartIndex.current = null;
  };
  
  const handleDragEnd = () => {
    setDragOverIndex(null);
    setDraggedItem(null);
    dragStartIndex.current = null;
  };
  
  return (
    <div className="drag-drop-list">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={\`drag-item \${draggedItem === item.id ? 'dragging' : ''} \${dragOverIndex === index ? 'drop-zone' : ''}\`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
        >
          {renderItem(item, draggedItem === item.id)}
        </div>
      ))}
    </div>
  );
};`;

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
  transition: all 0.2s ease;
}

.drag-item:hover {
  background: #e9ecef;
}

.drag-item.dragging {
  opacity: 0.5;
  transform: rotate(5deg);
}

.drag-item.drop-zone {
  background: #e3f2fd;
  border-color: #2196f3;
  transform: scale(1.02);
}`;
