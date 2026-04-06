'use client';

import { Button } from '@/components/ui/button';
import { LayoutGrid, Clock, Network } from 'lucide-react';

interface ViewSwitcherProps {
  view: 'grid' | 'timeline' | 'atlas';
  onViewChange: (view: 'grid' | 'timeline' | 'atlas') => void;
}

export function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center gap-2 glass-panel p-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] w-fit">
      <Button
        variant={view === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className={
          view === 'grid'
            ? 'bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#E6D5A8] font-semibold'
            : 'text-[#AAB0D6] hover:text-[#F5F3EE] hover:bg-[rgba(255,255,255,0.05)]'
        }
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Grid
      </Button>

      <Button
        variant={view === 'timeline' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('timeline')}
        className={
          view === 'timeline'
            ? 'bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#E6D5A8] font-semibold'
            : 'text-[#AAB0D6] hover:text-[#F5F3EE] hover:bg-[rgba(255,255,255,0.05)]'
        }
      >
        <Clock className="h-4 w-4 mr-2" />
        Timeline
      </Button>

      <Button
        variant={view === 'atlas' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('atlas')}
        className={
          view === 'atlas'
            ? 'bg-[#C8A75E] text-[#0B0F2A] hover:bg-[#E6D5A8] font-semibold'
            : 'text-[#AAB0D6] hover:text-[#F5F3EE] hover:bg-[rgba(255,255,255,0.05)]'
        }
      >
        <Network className="h-4 w-4 mr-2" />
        Atlas
      </Button>
    </div>
  );
}
