import React from 'react';

import { useNotes } from '../../../../context/NotesContext';
import './NoteItem.scss';

interface NoteItemProps {
    id: number | string;
    title: string;
    active: boolean;
}

const NoteItem: React.FC<NoteItemProps> = ({ id, title, active }) => {
    const { clickHandler } = useNotes();

    return (
        <div
            className={`NoteItem cursor-pointer ${active ? 'active' : ''}`}
            onClick={() => clickHandler(id)}>
            {title}
        </div>
    );
};

export default NoteItem;
