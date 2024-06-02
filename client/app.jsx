import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import JoinForm from './src/JoinForm';
import LoginForm from './src/LoginForm';
import MainScreen from './src/MainScreen';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<JoinForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/main" element={<MainScreen />} />
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

export default App;