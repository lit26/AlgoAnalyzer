import React from 'react';
import Button from '@mui/material/Button';
import './CustomButton.scss';

interface CustomButtonProps {
    text: string;
    onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick }) => {
    return (
        <div className="CustomButton">
            <Button onClick={onClick}>{text}</Button>
        </div>
    );
};

export default CustomButton;
