'use client';

import React from 'react';

interface OutputPreviewProps {
  output?: string;
  hasRun?: boolean;
  error?: string;
}

export function OutputPreview({ output, hasRun, error }: OutputPreviewProps) {
  return (
    <div className="w-1/3 bg-card">
      <div className="h-full flex flex-col">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-card-foreground">Output Preview</h2>
        </div>
        
        <div className="flex-1 p-6 overflow-hidden">
          <div className="bg-background border border-border rounded-lg h-full flex items-center justify-center overflow-y-auto">
            {error ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-600 dark:text-red-400 font-medium mb-2">Error</p>
                <p className="text-red-500 dark:text-red-300 text-sm">{error}</p>
              </div>
            ) : hasRun && output ? (
              <div className="w-full h-full p-4">
                <div className="bg-muted rounded-lg p-4 h-full overflow-auto">
                  <pre className="text-sm text-foreground whitespace-pre-wrap">{output}</pre>
                </div>
              </div>
            ) : hasRun ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-yellow-500 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-yellow-600 dark:text-yellow-400">No output generated</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-muted-foreground">Run your code to see the output</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
