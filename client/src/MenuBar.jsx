import React, { useState, useEffect } from 'react';
import Ichar from './images/logo/csIchar.png';
import { openDB } from './db';

function MenuBar() {
    const [username, setUsername] = useState('');
    const [userlist, setUserList] = useState([]);

    useEffect(() => {
        const getUserName = localStorage.getItem('username');
        if (getUserName) setUsername(getUserName); 

        const fetchUserName = async () => {
            try {
                const db = await openDB();
                const transaction = db.transaction(['users'], 'readonly');
                const store = transaction.objectStore('users');
                const request = store.getAll();

                request.onsuccess = (event) => {
                    const userList = event.target.result;
                    console.log("Fetched user list:", userList);
                    setUserList(userList);
                };

                request.onerror = (event) => {
                    console.error('Error fetching user list:', event.target.errorCode);
                };
            }
            catch (error){
                console.error("Error fetching user list: ", error);
            }
        };
        fetchUserName();
    }, []);

    return (
        <div className='menu'>
            <img src={Ichar} className='Iprofile' alt="Profile" />
            <h2 className='userName'>{username}님, 환영합니다!</h2>
            <div className='memberList'>
                <h2 className='member'>참여자 목록</h2>
                <ul>
                    {userlist.map((list) => (
                        <li key={list.id}>
                            <h3 className='userList'>{list.username}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MenuBar;
