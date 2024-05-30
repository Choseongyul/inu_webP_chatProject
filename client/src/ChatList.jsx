import React, { useState, useEffect } from 'react';
import { openDB } from './db';
import Button from './Button';

const ChatList = () => {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const db = await openDB();
                console.log("DB opened for fetching chat rooms");

                const transaction = db.transaction(['chatlist'], 'readonly');
                const store = transaction.objectStore('chatlist');
                const request = store.getAll();

                request.onsuccess = (event) => {
                    const chatRooms = event.target.result;
                    console.log("Fetched chat rooms:", chatRooms);
                    setChatRooms(chatRooms);
                };

                request.onerror = (event) => {
                    console.error('Error fetching chat rooms:', event.target.errorCode);
                };
            } catch (error) {
                console.error("Error fetching chat rooms: ", error);
            }
        };
        fetchChatRooms();
    }, []);

    return (
        <div className='ListForm'>
            <ul>
                {chatRooms.map((room) => (
                    <li key={room.id}>
                        <Button text={room.name} className='chatTitle'/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;