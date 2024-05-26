import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinForm from './src/JoinForm';
import LoginForm from './src/LoginForm';

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

// const Message = ({ user, text }) => {
//     return (
//         <div className="message">
//             <strong>{user} :</strong>
//             <span>{text}</span>
//         </div>
//     );
// };

// const MessageList = ({ messages }) => {
//     return (
//         <div className='messages'>
//             <h2> 채팅방 </h2>
//             {messages.map((message, i) => (
//                 <Message key={i} user={message.user} text={message.text} />
//             ))}
//         </div>
//     );
// };

// const MessageForm = ({ onMessageSubmit, user }) => {
//     const [text, setText] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const message = {
//             user,
//             text,
//         };
//         onMessageSubmit(message);
//         setText('');
//     };

//     const changeHandler = (e) => {
//         setText(e.target.value);
//     };

//     return (
//         <div className='message_form'>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     placeholder='메시지 입력'
//                     className='textinput'
//                     onChange={changeHandler}
//                     value={text}
//                 />
//                 <h3></h3>
//             </form>
//         </div>
//     );
// };

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

// const ChatApp = () => {
//     const [users, setUsers] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [user, setUser] = useState('');

//     useEffect(() => {
//         socket.on('init', _initialize);
//         socket.on('send:message', _messageRecieve);
//         socket.on('user:join', _userJoined);
//         socket.on('user:left', _userLeft);
//         socket.on('change:name', _userChangedName);

//         return () => {
//             socket.off('init', _initialize);
//             socket.off('send:message', _messageRecieve);
//             socket.off('user:join', _userJoined);
//             socket.off('user:left', _userLeft);
//             socket.off('change:name', _userChangedName);
//         };
//     }, []);

//     const _initialize = (data) => {
//         const { users, name } = data;
//         setUsers(users);
//         setUser(name);
//     };

//     const _messageRecieve = (message) => {
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

//     const handleMessageSubmit = (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//         socket.emit('send:message', message);
//     };

//     const handleChangeName = (newName) => {
//         const oldName = user;
//         socket.emit('change:name', { name: newName }, (result) => {
//             if (!result) {
//                 return alert('There was an error changing your name');
//             }
//             setUsers((prevUsers) => prevUsers.map((user) => (user === oldName ? newName : user)));
//             setUser(newName);
//         });
//     };

//     return (
//         <div>
//             <div className='center'>
//                 <UsersList users={users} />
//                 <ChangeNameForm onChangeName={handleChangeName} />
//                 <MessageList messages={messages} />
//                 <MessageForm onMessageSubmit={handleMessageSubmit} user={user} />
//             </div>
//         </div>
//     );
// };

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<JoinForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

export default App;