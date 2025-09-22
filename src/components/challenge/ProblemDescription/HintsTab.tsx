'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';

export function HintsTab() {
  const hints = [
    "Start by defining the TypeScript interface for your props",
    "Use CSS classes or styled-components for different variants",
    "Consider using a className prop for additional styling flexibility"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-card-foreground">Hints</h3>
      <Accordion type="single" collapsible className="w-full">
        {hints.map((hint, index) => (
          <AccordionItem key={index} value={`hint-${index + 1}`}>
            <AccordionTrigger className="text-left">
              💡 Hint {index + 1}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">
                {hint}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
