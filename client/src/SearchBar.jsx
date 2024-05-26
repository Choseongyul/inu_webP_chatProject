import React, { useState } from 'react';
import searchIcon from './images/logo/search.png';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="채팅방 제목을 입력하세요."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    aria-label="Search"
                />
                <button type="submit" aria-label="Search">
                    <img src={searchIcon} alt="Search"></img>
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
