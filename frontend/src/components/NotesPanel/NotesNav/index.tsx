import React, { useState } from 'react';
import Searchbar from '../../Searchbar';
import './NotesNav.scss';
import AddIcon from '@mui/icons-material/Add';
import NoteItem from './NoteItem';
import { useNotes } from '../../../context/NotesContext';

const NotesNav: React.FC = () => {
    const { notes, selectedNote } = useNotes();
    const [search, setSearch] = useState<string>('');

    const handleSearchChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setSearch(e.target.value);
    };

    return (
        <div className="NotesNav">
            <div className="NotesNav__search">
                <Searchbar
                    search={search}
                    placeholder="Search"
                    onChange={handleSearchChange}
                />
                <div>
                    <AddIcon />
                </div>
            </div>
            <div className="NotesItems__wrapper">
                <div className="NotesItems">
                    {notes.map(note => (
                        <NoteItem
                            key={`note_${note.id}`}
                            id={note.id}
                            title={note.title}
                            active={
                                selectedNote
                                    ? selectedNote.id === note.id
                                    : false
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotesNav;
