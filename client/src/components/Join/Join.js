import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';

import './Join.css';

const Join = () => {
    const [name, setName] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <input type="text" placeholder="Enter you name" className="joinInput" onChange={(e) => setName(e.target.value)} />
                <Link onClick={(e) => (!name ? e.preventDefault() : null)} to={`/chat?name=${name}`}>
                    <button className="button" type="submit"><FaArrowUp /></button>
                </Link>
            </div>
        </div>
    );
};

export default Join;
