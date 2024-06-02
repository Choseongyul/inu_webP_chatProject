// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import { openDB, addMessage, getMessages } from './db';

// const socket = io.connect();
// const username = localStorage.getItem('username');

// const Message = ({ user, text, time }) => {
//     return (
//         <div className="message">
//             <strong>{user}</strong>
//             <span className="message-text">{text}</span>
//             <div className="message-time">{time}</div>
//         </div>
//     );
// };

// const MessageList = ({ messages }) => {
//     return (
//         <div className='chat-content'>
//             {messages.map((message, i) => (
//                 <Message 
//                     key={i} 
//                     user={message.user} 
//                     text={message.text} 
//                     time={message.time} 
//                 />
//             ))}
//         </div>
//     );
// };

// const MessageForm = ({ onMessageSubmit, user }) => {
//     const [text, setText] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const message = {
//             user: user,
//             text,
//             time: new Date().toLocaleString()
//         };
//         onMessageSubmit(message);
//         setText('');
//     };

//     return (
//         <div className='message_form'>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     placeholder='메세지 입력'
//                     className='textinput'
//                     onChange={(e) => setText(e.target.value)}
//                     value={text}
//                 />
//                 <button type="submit" className="send-button">→</button>
//             </form>
//         </div>
//     );
// };

// const ChatRoom = ({ roomName, onClose }) => {
//     const [users, setUsers] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [user, setUser] = useState(username);

//     useEffect(() => {
//         const fetchMessages = async() => {
//             try {
//                 const db = await openDB();
//                 console.log("DB opened");
//                 const messages = await getMessages(db, roomName);
//                 setMessages(messages);
//             } 
//             catch (error) {
//                 console.error('Error fetching messages: ', error);
//             }
//         };
    
//         fetchMessages();
        
//         const username = localStorage.getItem('username');
//         setUser(username);
        
//         socket.emit('join:room', { roomName, user });
    
//         socket.on('init', _initialize);
//         socket.on('send:message', _messageReceive);
//         socket.on('user:join', _userJoined);
//         socket.on('user:left', _userLeft);
//         socket.on('change:name', _userChangedName);
    
//         return () => {
//             socket.off('init');
//             socket.off('send:message');
//             socket.off('user:join');
//             socket.off('user:left');
//             socket.off('change:name');
//         }
//     }, [roomName]);

//     const _initialize = (data) => {
//         const { users, name } = data;
//         setUsers(users);
//         setUsers(name);
//     };

//     const _messageReceive = (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//     };

//     const _userJoined = (data) => {
//         const { name } = data;
//         setUsers((prevUsers) => [...prevUsers, name]);
//     };

//     const _userLeft = (data) => {
//         const { name } = data;
//         setUsers((prevUsers) => prevUsers.filter((user) => user !== name));
//     };

//     const _userChangedName = (data) => {
//         const { oldName, newName } = data;
//         setUsers((prevUsers) => prevUsers.map((user) => (user === oldName ? newName : user)));
//     };

//     const handleMessageSubmit = async (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//         socket.emit('send:message', { ...message, roomName });

//         try {
//             const db = await openDB();
//             await addMessage(db, { ...message, roomName });
//         } 
//         catch (error) {
//             console.error('Error saving message:', error);
//         }
//     };

//     return (
//         <div className="chat-container">
//             <div className="chat-header">
//                 <h2> {roomName} </h2>
//                 <button className="close-button" onClick={ onClose }>✕</button>
//             </div>
//             <MessageList messages={messages} />
//             <MessageForm onMessageSubmit={handleMessageSubmit} user={user} />
//         </div>
//     );
// };

// export default ChatRoom;

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { openDB, addMessage, getMessages } from './db';

const socket = io.connect({query : { username }});
const username = localStorage.getItem('username');

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
            user: user,
            text,
            time: new Date().toLocaleString()
        };
        onMessageSubmit(message);
        setText('');
    };

    return (
        <div className='message_form'>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='메세지 입력'
                    className='textinput'
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                <button type="submit" className="send-button">→</button>
            </form>
        </div>
    );
};

const ChatRoom = ({ roomName, onClose }) => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(username);  // Ensure the correct user is set from the start

    useEffect(() => {
        const fetchMessages = async() => {
            try {
                const db = await openDB();
                console.log("DB opened");
                const messages = await getMessages(db, roomName);
                setMessages(messages);
            } 
            catch (error) {
                console.error('Error fetching messages: ', error);
            }
        };
    
        fetchMessages();
        
        const username = localStorage.getItem('username');
        setUser(username);

        socket.emit('join:room', { roomName, user });
    
        socket.on('init', _initialize);
        socket.on('send:message', _messageReceive);
        socket.on('user:join', _userJoined);
        socket.on('user:left', _userLeft);
        socket.on('change:name', _userChangedName);
    
        return () => {
            socket.off('init', _initialize);
            socket.off('send:message', _messageReceive);
            socket.off('user:join', _userJoined);
            socket.off('user:left', _userLeft);
            socket.off('change:name', _userChangedName);
        };
    }, [roomName, user]);

    const _initialize = (data) => {
        const { users, name } = data;
        setUsers(users);
        setUser(name);  // Ensure the correct user is set after initialization
    };

    const _messageReceive = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const _userJoined = (data) => {
        const { name } = data;
        setUsers((prevUsers) => [...prevUsers, name]);
    };

    const _userLeft = (data) => {
        const { name } = data;
        setUsers((prevUsers) => prevUsers.filter((user) => user !== name));
    };

    const _userChangedName = (data) => {
        const { oldName, newName } = data;
        setUsers((prevUsers) => prevUsers.map((user) => (user === oldName ? newName : user)));
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
                <h2>{roomName}</h2>
                <button className="close-button" onClick={onClose}>✕</button>
            </div>
            <MessageList messages={messages} />
            <MessageForm onMessageSubmit={handleMessageSubmit} user={user} />
        </div>
    );
};

export default ChatRoom;