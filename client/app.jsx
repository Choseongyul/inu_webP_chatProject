import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinForm from './src/JoinForm';
import LoginForm from './src/LoginForm';
import MainScreen from './src/MainScreen';

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<JoinForm />} />
                <Route path="/register" element={<JoinForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/main" element={<MainScreen />} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

export default App;