import { ReactNode } from 'react';
import { CheckSquare, LayoutGrid } from 'lucide-react';

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  icon?: 'check' | 'grid';
}

export function AuthCard({ children, title, subtitle, icon = 'check' }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/30 p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
          
          <div className="p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                {icon === 'check' ? (
                  <CheckSquare className="w-7 h-7 text-primary" />
                ) : (
                  <LayoutGrid className="w-7 h-7 text-primary" />
                )}
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {children}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2024 TaskMaster Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
