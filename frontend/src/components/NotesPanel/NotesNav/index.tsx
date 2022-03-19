import AddIcon from '@mui/icons-material/Add';
import React from 'react';

import { useNotes } from '../../../context/NotesContext';
import Searchbar from '../../Searchbar';
import NoteItem from './NoteItem';
import './NotesNav.scss';

const NotesNav: React.FC = () => {
    const { displayNotes, selectedNote, addNewNote, search, setSearch } =
        useNotes();

    const handleSearchChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setSearch(e.target.value);
    };

    const handleAddNote = () => {
        addNewNote(false);
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
                    <AddIcon onClick={handleAddNote} />
                </div>
            </div>
            <div className="NotesItems__wrapper">
                <div className="NotesItems">
                    {displayNotes.map(note => (
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
