import React from 'react';
import './NoteItem.scss';
import { useNotes } from '../../../../context/NotesContext';

interface NoteItemProps {
    id: number;
    title: string;
    active: boolean;
}

const NoteItem: React.FC<NoteItemProps> = ({ id, title, active }) => {
    const { clickHandler } = useNotes();

    return (
        <div
            className={`NoteItem ${active ? 'active' : ''}`}
            onClick={() => clickHandler(id)}>
            {title}
        </div>
    );
};

export default NoteItem;
