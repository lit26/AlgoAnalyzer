import React, { useState, useContext } from 'react';
import { ProviderProps } from '../types/provider';
import { Note } from '../types/data';

interface NotesContextProps {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    selectedNote?: Note;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
    clickHandler: (id: number) => void;
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
    const [selectedNote, setSelectedNote] = useState<Note | undefined>(
        undefined,
    );

    const clickHandler = (id: number) => {
        if (notes.length > 0) {
            const clickedNote = notes.find(note => note.id === id);
            if (clickedNote) {
                setSelectedNote(clickedNote);
            }
        }
    };

    const value = {
        notes,
        setNotes,
        selectedNote,
        setSelectedNote,
        clickHandler,
    };

    return (
        <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
    );
};
