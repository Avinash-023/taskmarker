import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  trend?: ReactNode;
  className?: string;
  iconBgColor?: string;
}

export function StatCard({ label, value, icon, trend, className, iconBgColor = 'bg-primary/10' }: StatCardProps) {
  return (
    <div className={cn('bg-card rounded-xl border border-border p-6 flex items-start justify-between', className)}>
      <div>
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', iconBgColor)}>
          {icon}
        </div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
      {trend && <div className="text-muted-foreground">{trend}</div>}
    </div>
  );
}
