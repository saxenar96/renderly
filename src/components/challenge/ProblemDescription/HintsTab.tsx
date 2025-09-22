'use client';

import React from 'react';

export function HintsTab() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-card-foreground">Hints</h3>
      <div className="space-y-3">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            💡 Start by defining the TypeScript interface for your props
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 Use CSS classes or styled-components for different variants
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm text-green-800 dark:text-green-200">
            💡 Consider using a className prop for additional styling flexibility
          </p>
        </div>
      </div>
    </div>
  );
}
