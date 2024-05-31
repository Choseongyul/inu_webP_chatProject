import React, { useState } from 'react';
import searchIcon from './images/logo/search.png';
import { openDB, addChatRoom, getChatRoom } from './db';

function SearchBar({ onAddChatRoom }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== '') {
            onAddChatRoom(searchTerm);
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
