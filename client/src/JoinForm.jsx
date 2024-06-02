import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Button from './Button';
import InuLogo from './images/logo/INU.png';
import inuChar from './images/logo/inuChar1.png';
import { openDB, addUser } from './db';
import bcrypt from 'bcryptjs';

const JoinForm = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (username.trim() !== '' && password.trim() !== '') {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, password]);

    const handleLogindirect = () => {
        navigate('/login'); // 로그인 페이지로 이동
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const db = await openDB();
            await addUser(db, { username, password: hashedPassword });
            alert('회원가입이 완료되었습니다!');
            navigate('/login'); // 회원가입 완료 후 로그인 페이지로 이동
        } catch (error) {
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <>
            <img src={inuChar} className='IChar' alt="INU Character" />
            <img src={InuLogo} className='ILogo' alt="INU Logo"/>
            <form className='submit-form' onSubmit={handleSignUp}>
                <div className='screenTitle'>chattering ver.SY</div>
                <InputField
                    className='text-input'
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <InputField
                    className='text-input'
                    type='password'
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    text="회원가입"
                    className='submit-button'
                    type="submit"
                    disabled={isButtonDisabled}
                />
                <Button
                    text="바로 로그인하기"
                    className='direct-login-button'
                    type="button"
                    onClick={handleLogindirect}
                />
            </form>
        </>
    );
};

export default JoinForm;
