import { cn } from '@/lib/utils';

interface TagBadgeProps {
  tag: string;
  className?: string;
}

const tagColors: Record<string, string> = {
  'personal': 'tag-personal',
  'work': 'tag-work',
  'ideas': 'tag-ideas',
  'project-alpha': 'tag-project',
};

export function TagBadge({ tag, className }: TagBadgeProps) {
  const colorClass = tagColors[tag] || 'bg-muted text-muted-foreground';
  
  return (
    <span className={cn('tag-chip', colorClass, className)}>
      <span className={cn(
        'w-1.5 h-1.5 rounded-full',
        tag === 'personal' && 'bg-pink-500',
        tag === 'work' && 'bg-blue-500',
        tag === 'ideas' && 'bg-amber-500',
        tag === 'project-alpha' && 'bg-emerald-500',
        !['personal', 'work', 'ideas', 'project-alpha'].includes(tag) && 'bg-muted-foreground',
      )} />
      {tag.replace('-', ' ').toUpperCase()}
    </span>
  );
}
