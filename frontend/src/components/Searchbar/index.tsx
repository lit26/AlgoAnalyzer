import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import React from 'react';

import './Searchbar.scss';

interface Searchbar {
    search: string;
    placeholder: string;
    onChange: (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => void;
}

const Searchbar: React.FC<Searchbar> = ({ search, onChange, placeholder }) => {
    return (
        <div className="Searchbar">
            <div className="Searchbar__iconWrapper">
                <SearchIcon />
            </div>
            <InputBase
                placeholder={placeholder}
                value={search}
                onChange={onChange}
                sx={{ flexGrow: 1, paddingRight: '20px' }}
            />
        </div>
    );
};

export default Searchbar;
