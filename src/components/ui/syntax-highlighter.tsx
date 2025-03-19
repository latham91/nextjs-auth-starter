'use client';

import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface SyntaxHighlighterProps {
  children: string;
  language?: string;
  className?: string;
}

export function SyntaxHighlighter({ 
  children, 
  language = 'typescript',
  className = '' 
}: SyntaxHighlighterProps) {
  
  useEffect(() => {
    hljs.highlightAll();
  }, [children]);

  return (
    <pre className={`rounded-lg overflow-x-auto ${className}`}>
      <code className={`language-${language}`}>
        {children}
      </code>
    </pre>
  );
} 