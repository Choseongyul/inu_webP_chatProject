import React from 'react';
import { createRoot } from 'react-dom/client';
import inuChar from './images/INU_character/inuChar1.png'

const InputField = ({ label, type = 'text', className, placeholder }) => {
    return (
        <div>
            <label>{label}</label>
            <input type={type} className={className} placeholder={placeholder} />
        </div>
    );
};

const Button = ({ text, onClick, type = 'button', className }) => {
    return (
        <div>
            <button type={type} className={className} onClick={onClick}>
                {text}
            </button>
        </div>
    );
};

const LoginForm = () => {
    return (
        <div className='login-form'>
            <text className='screenTitle'>회원가입</text>
            <InputField className='text-input' placeholder="아이디"/>
            <InputField className='text-input' placeholder="비밀번호"/>
            <Button text="회원가입" className='submit-button' />
            <Button text="바로 로그인" className='direct-login-button' />
        </div>
    );
};

export default LoginForm;

const root = createRoot(document.getElementById('app'));
root.render(<LoginForm />);
