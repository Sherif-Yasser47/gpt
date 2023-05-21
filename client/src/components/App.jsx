// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Chat from './Chat/chat';
import history from '../history';
import { RegistrationForm } from './RegisterationForm/RegistrationForm';
const App = () => {
    console.log(history);
    return (
        <div>
            <Router history={history}>
                <div>
                    <Routes>
                        <Route path="/"  element={<RegistrationForm />} />
                        <Route path="/chatroom" element={<Chat />} />
                    </Routes>

                </div>

            </Router>
        </div>
    )
};

export default App;