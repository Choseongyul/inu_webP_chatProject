import React, { useState, useEffect } from 'react';

import InputField from './InputField';
import Button from './Button';
import InuLogo from './images/logo/INU.png';
import inuChar from './images/logo/inuChar1.png';
import { openDB, getUser } from './db';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    
    const movePage = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (username.trim() !== '' && password.trim() !== '') {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, password]);

    const handleMaindirect = async (e) => {
        e.preventDefault();

        try {
            const db = await openDB();
            const user = await getUser(db, username);

            if (user && user.password === password) {
                localStorage.setItem('username', username);
                movePage('/main');
            } 
            else {
                alert("회원가입을 먼저 진행 해주세요.");
            }
        } 
        catch (error) {
            alert('로그인 실패! 다시 시도 해주세요.');
        }
    };

    return (
        <>
            <img src={inuChar} className='IChar' alt="INU Character" />
            <img src={InuLogo} className='ILogo' alt="INU Logo"/>
            <form className="submit-form" onSubmit={handleMaindirect}>
                <div className="loginText">로그인</div>
                <div>
                    <InputField
                        type="text"
                        className="text-input"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputField
                        type="password"
                        className="text-input"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button 
                    text="로그인" 
                    className="login-button" 
                    type="submit"
                    disabled={isButtonDisabled}/>
            </form>
        </>
    );
};

export default LoginForm;
