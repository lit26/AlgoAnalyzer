import React, { useEffect } from 'react';
import Split from 'react-split';

import { getAllNotes } from '../../apis/notes';
import { useNotes } from '../../context/NotesContext';
import NoteContent from './NoteContent';
import NotesNav from './NotesNav';
import './NotesPanel.scss';

const NotesPanel: React.FC = () => {
    const { setNotes, setSelectedNote, addNewNote } = useNotes();

    useEffect(() => {
        getAllNotes()
            .then(res => {
                if (res.length > 0) {
                    setNotes(res);
                    setSelectedNote(res[0]);
                } else {
                    addNewNote(true);
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <Split
            className="NotesPanel"
            sizes={[20, 80]}
            // minSize={[300, 200]}
            expandToMin={false}
            gutterSize={3}
            gutterAlign="center"
            dragInterval={1}>
            <NotesNav />
            <NoteContent />
        </Split>
    );
};

export default NotesPanel;
