import React from 'react';
import { createRoot } from 'react-dom/client';
import SearchBar from './SearchBar';
import MenuBar from './MenuBar';
import InuLogo from './images/logo/INU.png';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

const MainScreen = () => {
    return (
        <>
            <img src={InuLogo} className='InuLogo' alt="INU Logo"/>
            <SearchBar/>
            <MenuBar />
            <ChatList />
            <ChatRoom />
        </>
    );
};

export default MainScreen;