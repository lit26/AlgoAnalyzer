import { Note } from '../types/data';
import { NoteRes } from '../types/response';
import { API_URL, apiRequest } from './util';

const formatRes = (note: NoteRes) => ({
    id: note.id,
    title: note.title,
    content: note.content,
    relateStock: note.relate_stock,
    relateStrategy: note.relate_strategy,
    createdAt: note.created_at,
    updatedAt: note.updated_at,
});

export const getAllNotes = () => {
    return new Promise<Note[]>((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/notes/`, 'GET')
            .then((res: NoteRes[]) => resolve(res.map(note => formatRes(note))))
            .catch(err => reject(err));
    });
};

export const createNote = (note: Note) => {
    return new Promise<Note>((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/notes/`, 'POST', {
            ...note,
            relate_stock: note.relateStock,
            relate_strategy: note.relateStrategy,
        })
            .then((res: NoteRes) => resolve(formatRes(res)))
            .catch(err => reject(err));
    });
};

export const updateNote = (note: Note) => {
    return new Promise<Note>((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/notes/${note.id}`, 'PUT', {
            ...note,
            relate_stock: note.relateStock,
            relate_strategy: note.relateStrategy,
        })
            .then((res: NoteRes) => resolve(formatRes(res)))
            .catch(err => reject(err));
    });
};

export const deleteNote = (noteId: number) => {
    return apiRequest(`${API_URL}/api/v1/notes/${noteId}`, 'DELETE');
};
