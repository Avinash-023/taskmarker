import { cn } from '@/lib/utils';
import { TaskStatus, TaskPriority } from '@/types';
import { Circle, CheckCircle, Clock, Search, Flag } from 'lucide-react';

interface StatusBadgeProps {
  status: TaskStatus;
}

const statusConfig = {
  'todo': { label: 'To Do', icon: Circle, className: 'status-todo' },
  'in-progress': { label: 'In Progress', icon: Clock, className: 'status-in-progress' },
  'done': { label: 'Done', icon: CheckCircle, className: 'status-done' },
  'review': { label: 'Review', icon: Search, className: 'status-review' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span className={cn('status-chip', config.className)}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const priorityConfig = {
  'low': { label: 'Low', className: 'priority-low' },
  'medium': { label: 'Medium', className: 'priority-medium' },
  'high': { label: 'High', className: 'priority-high' },
  'critical': { label: 'Critical', className: 'priority-critical' },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <span className={cn('inline-flex items-center gap-1 text-sm', config.className)}>
      <Flag className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}
