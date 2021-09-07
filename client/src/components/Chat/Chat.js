import React, {useState, useEffect} from 'react';
import querysString from 'query-string';
import {io} from 'socket.io-client';

import './Chat.css';

import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;
const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = '127.0.0.1:5000';

  useEffect(() => {
    const {name} = querysString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);

    console.log(socket);
    socket.emit('join', {name}, () => {});

    return () => {
      //   socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
