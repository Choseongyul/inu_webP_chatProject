import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { openDB, addMessage, getMessages } from './db';

const socket = io.connect();

// const UsersList = ({ users }) => {
//     return (
//         <div className='users'>
//             <h3> 참여자들 </h3>
//             <ul>
//                 {users.map((user, i) => (
//                     <li key={i}>{user}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

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

// const ChangeNameForm = ({ onChangeName }) => {
//     const [newName, setNewName] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onChangeName(newName);
//         setNewName('');
//     };

//     const onKey = (e) => {
//         setNewName(e.target.value);
//     };

//     return (
//         <div className='change_name_form'>
//             <h3> 아이디 변경 </h3>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     placeholder='변경할 아이디 입력'
//                     onChange={onKey}
//                     value={newName}
//                 />
//             </form>
//         </div>
//     );
// };

const ChatRoom = ({ roomName }) => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchMessages = async() => {
            try {
                const db = await openDB();
                const messages = await getMessages(db, roomName);
                setMessages(messages);
            }
            catch (error) {
                console.error('Error fetch message : ', error);
            }
        };

        fetchMessages();

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
    }, [roomName]);

    const _initialize = (data) => {
        const { users, name } = data;
        setUsers(users);
        setUser(name);
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
        socket.emit('send:message', message);

        try {
            const db = await openDB();
            await addMessage(db, {...message, roomName });
        } catch (error) {
            console.error('Error saving message:', error);
        }
    };

    // const handleChangeName = (newName) => {
    //     const oldName = user;
    //     socket.emit('change:name', { name: newName }, (result) => {
    //         if (!result) {
    //             return alert('There was an error changing your name');
    //         }
    //         setUsers((prevUsers) => prevUsers.map((user) => (user === oldName ? newName : user)));
    //         setUser(newName);
    //     });
    // };

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