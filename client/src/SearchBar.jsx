import React, { useState } from 'react';
import searchIcon from './images/logo/search.png';
import { openDB, addChatRoom, getChatRoom } from './db';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const db = await openDB();
            console.log("DB opened for search");

            const chatRoom = await getChatRoom(db, searchTerm);
            console.log(chatRoom);

            if (chatRoom) {
                alert(`채팅방 ${chatRoom.name}이 이미 존재합니다.`);
            } else {
                const createRoom = window.confirm('채팅방이 존재하지 않습니다. 생성하시겠습니까?');
                
                if (createRoom) {
                    await addChatRoom(db, { name: searchTerm });
                    alert('채팅방 생성이 완료되었습니다.');
                } else {
                    alert('채팅방 제목 다시 검색.');
                }
            }
        } catch (error) {
            console.error("Error during search: ", error);
        }
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="채팅방 제목을 입력하세요."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search"
                />
                <button type="submit" aria-label="Search">
                    <img src={searchIcon} alt="Search" />
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
