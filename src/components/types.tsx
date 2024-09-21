export interface NoteType {
  id?: number;
  title: string;
  description: string;
  status?: string;
}

export interface UpdatedNoteType {
  message: string;
  updatedNotes: NoteType;
}

export interface UpdatedNoteParams {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
}