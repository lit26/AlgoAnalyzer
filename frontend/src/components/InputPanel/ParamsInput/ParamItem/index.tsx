import React from 'react';

interface ParamItemProps {
    name: string;
    defaultParam: any;
}

const ParamItem: React.FC<ParamItemProps> = ({ name, defaultParam }) => {
    return (
        <div>
            <div>{name}</div>
            <div>{defaultParam}</div>
        </div>
    );
};

export default ParamItem;
