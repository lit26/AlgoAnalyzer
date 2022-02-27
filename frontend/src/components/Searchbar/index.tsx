import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
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
            />
        </div>
    );
};

export default Searchbar;
