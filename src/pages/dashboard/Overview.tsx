import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, CheckCircle, Clock, TrendingUp, Hourglass, FileStack, CheckSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge, PriorityBadge } from '@/components/ui/status-badge';
import { TagBadge } from '@/components/ui/tag-badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TaskModal } from '@/components/tasks/TaskModal';
import { NoteModal } from '@/components/notes/NoteModal';
import { Task, Note } from '@/types';
import { format } from 'date-fns';
import { tasksAPI, notesAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function Overview() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksData, notesData] = await Promise.all([
        tasksAPI.getAll(),
        notesAPI.getAll()
      ]);
      setTasks(tasksData.map((t: any) => ({ ...t, id: t._id })));
      setNotes(notesData.map((n: any) => ({ ...n, id: n._id })));
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const pendingTasks = tasks.filter(t => t.status !== 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const recentTasks = tasks.slice(0, 4);
  const recentNotes = notes.slice(0, 3);

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      await tasksAPI.create(taskData);
      toast({ title: 'Success', description: 'Task created successfully' });
      fetchData(); // Refresh data
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create task',
        variant: 'destructive'
      });
    }
  };

  const handleSaveNote = async (noteData: Partial<Note>) => {
    try {
      await notesAPI.create(noteData);
      toast({ title: 'Success', description: 'Note created successfully' });
      fetchData(); // Refresh data
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create note',
        variant: 'destructive'
      });
    }
  };

  const today = format(new Date(), 'EEEE, MMM d');

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Hi, {user?.fullName?.split(' ')[0] || 'there'}
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's your daily brief for <span className="text-primary font-medium">{today}</span>.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setNoteModalOpen(true)}>
              <FileText className="w-4 h-4 mr-2" />
              New Note
            </Button>
            <Button onClick={() => setTaskModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
          <StatCard
            label="Tasks Pending"
            value={pendingTasks}
            icon={<Hourglass className="w-6 h-6 text-destructive" />}
            iconBgColor="bg-destructive/10"
            trend={<Clock className="w-12 h-12 text-muted-foreground/30" />}
          />
          <StatCard
            label="In Progress"
            value={inProgressTasks}
            icon={<Clock className="w-6 h-6 text-info" />}
            iconBgColor="bg-info/10"
            trend={<TrendingUp className="w-12 h-12 text-muted-foreground/30" />}
          />
          <StatCard
            label="Notes Added"
            value={notes.length}
            icon={<FileStack className="w-6 h-6 text-primary" />}
            iconBgColor="bg-primary/10"
            trend={<FileText className="w-12 h-12 text-muted-foreground/30" />}
          />
        </div>

        {/* Recent Tasks & Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tasks */}
          <div className="bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Recent Tasks</h2>
              </div>
              <Link to="/dashboard/tasks" className="text-sm text-primary hover:underline font-medium">
                View All
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentTasks.map((task) => (
                <div key={task.id} className="px-6 py-4 flex items-start gap-3">
                  <Checkbox
                    checked={task.status === 'done'}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-foreground ${task.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <StatusBadge status={task.status} />
                      {task.dueDate && (
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(task.dueDate), 'MMM d')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Notes */}
          <div className="bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Recent Notes</h2>
              </div>
              <Link to="/dashboard/notes" className="text-sm text-primary hover:underline font-medium">
                View All
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentNotes.map((note) => (
                <div key={note.id} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-1">
                    {note.tags[0] && <TagBadge tag={note.tags[0]} />}
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(note.createdAt), 'MMM d')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{note.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TaskModal
        open={taskModalOpen}
        onOpenChange={setTaskModalOpen}
        onSave={handleSaveTask}
      />
      <NoteModal
        open={noteModalOpen}
        onOpenChange={setNoteModalOpen}
        onSave={handleSaveNote}
      />
    </DashboardLayout>
  );
}
