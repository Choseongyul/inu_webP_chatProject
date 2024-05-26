import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import InuLogo from './images/logo/INU.png';
import inuChar from './images/logo/inuChar1.png';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isFormValid = username !== '' && password !== '';

    return (
        <>
            <img src={inuChar} className='IChar' alt="INU Character" />
            <img src={InuLogo} className='ILogo' alt="INU Logo"/>
            <form className="submit-form">
                <text className="loginText">로그인</text>
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
                    className="submit-button" 
                    type="submit"
                    disabled={!isFormValid}
                />
            </form>
        </>
    );
};

export default LoginForm;