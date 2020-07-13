import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = () => {
    return (
        <div className="back">
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default BackButton;