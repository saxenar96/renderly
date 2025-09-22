'use client';

import React from 'react';

export function ExamplesTab() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-card-foreground">Examples</h3>
      <div className="bg-muted rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-2">Example usage:</p>
        <pre className="text-sm text-foreground bg-background p-3 rounded border border-border">
{`<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="outline" size="sm" disabled>
  Disabled
</Button>`}
        </pre>
      </div>
    </div>
  );
}
