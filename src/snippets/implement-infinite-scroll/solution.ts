export const appSolutionCode = `import React, { useState, useEffect, useCallback, useRef } from 'react';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  
  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      setError(null);
      await loadMore();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more data');
    } finally {
      setLoading(false);
    }
  }, [loadMore, hasMore, loading]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          handleLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );
    
    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }
    
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [handleLoadMore, hasMore, loading]);
  
  return (
    <div className="infinite-scroll">
      {data.map((item, index) => (
        <div key={index} className="scroll-item">
          {renderItem(item, index)}
        </div>
      ))}
      
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <button 
            onClick={handleLoadMore}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      )}
      
      {loading && (
        <div className="loading">
          {loadingComponent || 'Loading...'}
        </div>
      )}
      
      {!hasMore && data.length > 0 && (
        <div className="end-message">
          No more data to load
        </div>
      )}
      
      <div ref={observerRef} className="observer-target" />
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

.infinite-scroll {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
}

.scroll-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.scroll-item:last-child {
  border-bottom: none;
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
  text-align: center;
}

.retry-button {
  margin-top: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.retry-button:hover {
  background-color: #c82333;
}

.end-message {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

.observer-target {
  height: 1px;
}`;
