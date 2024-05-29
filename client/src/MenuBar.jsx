import React, { useState } from 'react';
import people from './images/logo/people.png';
import chat from './images/logo/chat.png';
import bell from './images/logo/bell.png';
import profile from './images/logo/profile.png';

function MenuBar() {
    return (
        <div className='menu'>
            <img src={people} className='Ipeople'></img>
            <img src={chat} className='Ichat'></img>
            <img src={bell} className='Ibell'></img>
            <img src={profile} className='Iprofile'></img>
        </div>
    );
}

export default MenuBar;