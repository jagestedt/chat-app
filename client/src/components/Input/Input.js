import React from 'react';

import {FaArrowUp} from 'react-icons/fa';

import './Input.css';

const Input = ({message, setMessage, sendMessage}) => (
  <div className="inputContainer">
    <form className="form">
      <input className="input" type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)} />
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        <FaArrowUp />
      </button>
    </form>
  </div>
);

export default Input;
