import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MenuBar from './MenuBar';
import InuLogo from './images/logo/INU.png';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import { openDB, addChatRoom, getChatRoom } from './db';

const MainScreen = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [selectChatRoom, setSelectChatRoom] = useState(null);

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const db = await openDB();
                const transaction = db.transaction(['chatlist'], 'readonly');
                const store = transaction.objectStore('chatlist');
                const request = store.getAll();

                request.onsuccess = (event) => {
                    const rooms = event.target.result;
                    setChatRooms(rooms);
                };

                request.onerror = (event) => {
                    console.error('Error fetching chat rooms:', event.target.errorCode);
                };
            } catch (error) {
                console.error('Error fetching chat rooms: ', error);
            }
        };
        fetchChatRooms();
    }, []);

    const handleAddChatRoom = async (roomName) => {
        try {
            const db = await openDB();
            const chatRoom = await getChatRoom(db, roomName);

            if (!chatRoom) {
                const createRoom = window.confirm('검색결과가 없습니다. 채팅방을 생성하시겠습니까?');
                if (createRoom) {
                    const newRoom = { name: roomName };
                    await addChatRoom(db, newRoom);
                    setChatRooms([...chatRooms, newRoom]);
                }
            } else {
                alert('채팅방이 이미 존재합니다.');
            }
        } catch (error) {
            console.error('Error adding chat room: ', error);
        }
    };

    const handleSelectChatRoom = (roomName) => {
        setSelectChatRoom(roomName);
    }

    return (
        <>
            <img src={InuLogo} className='InuLogo' alt="INU Logo"/>
            <SearchBar onAddChatRoom={handleAddChatRoom} />
            <MenuBar />
            <ChatList chatRooms={chatRooms} onSelectChatRoom={handleSelectChatRoom}/>
            
            {selectChatRoom && <ChatRoom roomName={selectChatRoom} />}
        </>
    );
};

export default MainScreen;