import { useState, useMemo, useEffect } from 'react';
import { Plus, Search, MoreHorizontal, Pencil, Trash2, LayoutGrid, List } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TagBadge } from '@/components/ui/tag-badge';
import { NoteModal } from '@/components/notes/NoteModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Note } from '@/types';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { notesAPI } from '@/lib/api';

const tagOptions = ['personal', 'work', 'ideas', 'project-alpha'];

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const { toast } = useToast();

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Fetch notes from API
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await notesAPI.getAll();
      setNotes(data.map((note: any) => ({
        ...note,
        id: note._id
      })));
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to fetch notes',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase());
      const matchesTag = tagFilter === 'all' || note.tags.includes(tagFilter);
      return matchesSearch && matchesTag;
    });
  }, [notes, search, tagFilter]);

  const handleSaveNote = async (noteData: Partial<Note>) => {
    try {
      if (noteData.id) {
        // Update existing note
        await notesAPI.update(noteData.id, noteData);
        toast({ title: 'Note updated', description: 'Your note has been updated successfully.' });
      } else {
        // Create new note
        await notesAPI.create(noteData);
        toast({ title: 'Note created', description: 'Your new note has been created.' });
      }
      setEditingNote(null);
      fetchNotes(); // Refresh the notes list
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to save note',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteNote = async () => {
    if (noteToDelete) {
      try {
        await notesAPI.delete(noteToDelete.id);
        toast({ title: 'Note deleted', description: 'The note has been removed.' });
        setNoteToDelete(null);
        fetchNotes(); // Refresh the notes list
      } catch (error: any) {
        toast({ 
          title: 'Error', 
          description: error.message || 'Failed to delete note',
          variant: 'destructive'
        });
      }
    }
    setDeleteDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Notes</h1>
            <p className="text-muted-foreground">Capture ideas and keep track of important information.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn('rounded-none h-9', viewMode === 'grid' && 'bg-muted')}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn('rounded-none h-9', viewMode === 'list' && 'bg-muted')}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            <Button onClick={() => { setEditingNote(null); setModalOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </div>
        </div>

        {/* Search & Tags */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, tag, or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={tagFilter === 'all' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setTagFilter('all')}
            >
              All
            </Button>
            {tagOptions.map((tag) => (
              <Button
                key={tag}
                variant={tagFilter === tag ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setTagFilter(tag)}
                className="capitalize"
              >
                {tag.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>

        {/* Notes Grid/List */}
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card rounded-xl border border-border">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">No notes found</h3>
            <p className="text-muted-foreground mb-4">
              {search || tagFilter !== 'all'
                ? 'Try adjusting your filters'
                : "You haven't created any notes yet"}
            </p>
            <Button onClick={() => { setEditingNote(null); setModalOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Create your first note
            </Button>
          </div>
        ) : (
          <div className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'flex flex-col gap-3'
          )}>
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-3">
                  {note.tags[0] && <TagBadge tag={note.tags[0]} />}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(note.createdAt), 'MMM d')}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setEditingNote(note); setModalOpen(true); }}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => { setNoteToDelete(note); setDeleteDialogOpen(true); }}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{note.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{note.content}</p>
              </div>
            ))}

            {/* Create New Note Card */}
            <button
              onClick={() => { setEditingNote(null); setModalOpen(true); }}
              className="bg-card rounded-xl border-2 border-dashed border-border p-5 flex flex-col items-center justify-center min-h-[160px] hover:border-primary hover:bg-muted/50 transition-colors"
            >
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Create new note</span>
            </button>
          </div>
        )}
      </div>

      <NoteModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        note={editingNote}
        onSave={handleSaveNote}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete note?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete "{noteToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteNote} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
