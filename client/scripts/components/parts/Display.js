import React from 'react';

const Display = ({ children, If }) => {
    return If ? <div>{children}</div> : null;
};

export default Display;