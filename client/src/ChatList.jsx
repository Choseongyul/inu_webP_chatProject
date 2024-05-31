import React from 'react';
// import { openDB } from './db';
import Button from './Button';

const ChatList = ({ chatRooms, onSelectChatRoom }) => {
    return (
        <div className='ListForm'>
            <ul>
                {chatRooms.map((room) => (
                    <li key={room.id}>
                        <Button text={room.name} className='chatTitle' onClick={() => onSelectChatRoom(room.name)}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;