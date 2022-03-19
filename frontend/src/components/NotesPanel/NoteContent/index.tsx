import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React from 'react';

import { createNote, deleteNote, updateNote } from '../../../apis/notes';
import { useNotes } from '../../../context/NotesContext';
import { Note } from '../../../types/data';
import './NoteContent.scss';

const NoteContent: React.FC = () => {
    const { selectedNote, setSelectedNote, notes, setNotes, addNewNote } =
        useNotes();

    const createdTime =
        selectedNote && selectedNote.createdAt
            ? new Date(selectedNote.createdAt).toLocaleDateString('en-US')
            : '';

    const updatedTime =
        selectedNote && selectedNote.updatedAt
            ? new Date(selectedNote.updatedAt).toLocaleDateString('en-US')
            : '';

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (selectedNote) {
            setSelectedNote({
                ...selectedNote,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSave = () => {
        const updateNotes = (resNote: Note, id: number | string) => {
            setNotes(notes.map(note => (note.id === id ? resNote : note)));
            setSelectedNote(resNote);
        };
        if (selectedNote) {
            if (typeof selectedNote.id === 'number') {
                updateNote(selectedNote)
                    .then(resNote => updateNotes(resNote, resNote.id))
                    .catch(err => console.log(err));
            } else {
                createNote(selectedNote)
                    .then(resNote => updateNotes(resNote, selectedNote.id))
                    .catch(err => console.log(err));
            }
        }
    };

    const handleDelete = () => {
        if (selectedNote) {
            if (typeof selectedNote.id === 'number') {
                deleteNote(selectedNote.id)
                    .then(() => {
                        const newNotes = notes.filter(
                            note => note.id !== selectedNote.id,
                        );

                        if (newNotes.length === 0) {
                            addNewNote(true);
                        } else {
                            setSelectedNote(newNotes[0]);
                            setNotes(newNotes);
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                const newNotes = notes.filter(
                    note => note.id !== selectedNote.id,
                );
                if (newNotes.length === 0) {
                    addNewNote(true);
                } else {
                    setSelectedNote(newNotes[0]);
                    setNotes(newNotes);
                }
            }
        }
    };

    return (
        <div className="NoteContent">
            {selectedNote && (
                <>
                    <div className="NoteContent__infoWrapper">
                        <div className="NoteContent__info">
                            <input
                                className="NoteContent__title"
                                name="title"
                                value={selectedNote.title}
                                onChange={handleChange}
                            />
                            {selectedNote.createdAt && (
                                <div className="NoteContent__infoTime">{`Created: ${createdTime}. Updated: ${updatedTime}`}</div>
                            )}
                        </div>
                        <div className="NoteContent__icons">
                            <div className="NoteContent__icon">
                                <SaveOutlinedIcon onClick={handleSave} />
                            </div>
                            <div className="NoteContent__icon">
                                <DeleteOutlineOutlinedIcon
                                    onClick={handleDelete}
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="subDivider" />
                    <textarea
                        className="NoteContent__content"
                        name="content"
                        value={selectedNote.content}
                        onChange={handleChange}
                    />
                </>
            )}
        </div>
    );
};

export default NoteContent;