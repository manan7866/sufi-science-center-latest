import { ReactNode } from 'react';

interface KnowledgeGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function KnowledgeGrid({ children, columns = 3 }: KnowledgeGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {children}
    </div>
  );
}
