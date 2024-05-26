import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Button from './Button';
import InuLogo from './images/logo/INU.png';
import inuChar from './images/logo/inuChar1.png';

const JoinForm = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login'); // 로그인 페이지로 이동
    };

    return (
        <>
            <img src={inuChar} className='IChar' alt="INU Character" />
            <img src={InuLogo} className='ILogo' alt="INU Logo"/>
            <form className='submit-form'>
                <div className='screenTitle'>chattering ver.SY</div>
                <InputField
                    className='text-input'
                    placeholder="아이디"
                />
                <InputField
                    className='text-input'
                    type='password'
                    placeholder="비밀번호"
                />
                <Button text="회원가입" className='submit-button' />
                <Button text="바로 로그인하기" className='direct-login-button' type="button" onClick={handleLoginRedirect} />
            </form>
        </>
    );
};

export default JoinForm;
