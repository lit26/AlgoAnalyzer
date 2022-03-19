import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { Note } from '../types/data';
import { ProviderProps } from '../types/provider';

interface NotesContextProps {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    displayNotes: Note[];
    setDisplayNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    selectedNote?: Note;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
    clickHandler: (id: number | string) => void;
    addNewNote: (clear: boolean) => void;
}

const NotesContext = React.createContext<NotesContextProps | undefined>(
    undefined,
);

export function useNotes() {
    const context = useContext(NotesContext);
    if (context === undefined) {
        throw new Error('useContext must be within Provider');
    }
    return context;
}

export const NotesProvider: React.FC<ProviderProps> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [search, setSearch] = useState<string>('');
    const [displayNotes, setDisplayNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | undefined>(
        undefined,
    );

    useEffect(() => {
        if (search === '') {
            setDisplayNotes(notes);
        } else {
            setDisplayNotes(
                notes.filter(
                    note =>
                        note.title.includes(search.toLowerCase()) ||
                        note.content.includes(search.toLowerCase()),
                ),
            );
        }
    }, [notes, search]);

    const clickHandler = (id: number | string) => {
        if (notes.length > 0) {
            if (selectedNote) {
                setNotes(
                    notes.map(note =>
                        note.id === selectedNote.id ? selectedNote : note,
                    ),
                );
            }
            const clickedNote = notes.find(note => note.id === id);
            if (clickedNote) {
                setSelectedNote(clickedNote);
            }
        }
    };

    const addNewNote = (clear: boolean) => {
        const newNote: Note = {
            id: v4(),
            title: 'Untitled Note',
            content: '',
            relateStock: '',
            relateStrategy: '',
        };
        const newNotes = !clear ? notes : [];
        setNotes([newNote, ...newNotes]);
        setSelectedNote(newNote);
    };

    const value = {
        notes,
        setNotes,
        displayNotes,
        setDisplayNotes,
        search,
        setSearch,
        selectedNote,
        setSelectedNote,
        clickHandler,
        addNewNote,
    };

    return (
        <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
    );
};
