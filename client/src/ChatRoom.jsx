import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { openDB, addMessage, getMessages } from './db';

const socket = io.connect();

const Message = ({ user, text, time }) => {
    return (
        <div className="message">
            <strong>{user}</strong>
            <span className="message-text">{text}</span>
            <div className="message-time">{time}</div>
        </div>
    );
};

const MessageList = ({ messages }) => {
    return (
        <div className='chat-content'>
            {messages.map((message, i) => (
                <Message 
                    key={i} 
                    user={message.user} 
                    text={message.text} 
                    time={message.time} 
                />
            ))}
        </div>
    );
};

const MessageForm = ({ onMessageSubmit, user }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            user,
            text,
            time: new Date().toLocaleString() // 메시지 전송 시간을 추가
        };
        onMessageSubmit(message);
        setText('');
    };

    const changeHandler = (e) => {
        setText(e.target.value);
    };

    return (
        <div className='message_form'>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='메세지 입력'
                    className='textinput'
                    onChange={changeHandler}
                    value={text}
                />
                <button type="submit" className="send-button">→</button>
            </form>
        </div>
    );
};

const ChatRoom = ({ roomName }) => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchMessages = async() => {
            try {
                const db = await openDB();
                console.log("DB opened");
                const messages = await getMessages(db, roomName);
                setMessages(messages);
            } catch (error) {
                console.error('Error fetching messages: ', error);
            }
        };

        fetchMessages();

        socket.emit('join:room', roomName);

        socket.on('init', _initialize);
        socket.on('send:message', _messageReceive);
        socket.on('user:join', _userJoined);
        socket.on('user:left', _userLeft);
        socket.on('change:name', _userChangedName);

        return () => {
            socket.off('send:message');
        }
        // return () => {
        //     socket.off('init', _initialize);
        //     socket.off('send:message', _messageReceive);
        //     socket.off('user:join', _userJoined);
        //     socket.off('user:left', _userLeft);
        //     socket.off('change:name', _userChangedName);
        // };
    }, [roomName]);

    const _initialize = (data) => {
        const { users, name } = data;
        setUser(users);
        setUser(name);
    };

    const _messageReceive = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const _userJoined = (data) => {
        const { name } = data;
        setUser((prevUsers) => [...prevUsers, name]);
    };

    const _userLeft = (data) => {
        const { name } = data;
        setUser((prevUsers) => prevUsers.filter((user) => user !== name));
    };

    const _userChangedName = (data) => {
        const { oldName, newName } = data;
        setUser((prevUsers) => prevUsers.map((user) => (user === oldName ? newName : user)));
    };

    const handleMessageSubmit = async (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        socket.emit('send:message', { ...message, roomName });

        try {
            const db = await openDB();
            await addMessage(db, { ...message, roomName });
        } 
        catch (error) {
            console.error('Error saving message:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2> {roomName} </h2>
                <button className="close-button">✕</button>
            </div>
            <MessageList messages={messages} />
            <MessageForm onMessageSubmit={handleMessageSubmit} user={user} />
        </div>
    );
};

export default ChatRoom;