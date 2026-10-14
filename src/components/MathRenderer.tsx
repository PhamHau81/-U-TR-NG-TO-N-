import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '', block = false }) => {
  // If the content contains LaTeX delimiters like $...$ or $$...$$
  const renderFormulaWithKatex = (text: string) => {
    try {
      // Split by $ or $$
      const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);
      return parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2);
          const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
          return <span key={index} dangerouslySetInnerHTML={{ __html: html }} className="inline-block my-1" />;
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
          return <span key={index} dangerouslySetInnerHTML={{ __html: html }} className="inline-block mx-0.5" />;
        } else {
          return <span key={index}>{part}</span>;
        }
      });
    } catch {
      return <span>{text}</span>;
    }
  };

  return (
    <span className={`inline-math-container ${className} ${block ? 'block text-center' : ''}`}>
      {renderFormulaWithKatex(content)}
    </span>
  );
};
