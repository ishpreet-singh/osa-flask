import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    const [currentTime, setCurrentTime] = useState(0);
    const [currCmd, setCurCmd] = useState(0);

    useEffect(() => {

        fetch('/time').then(res => res.json()).then(data => {
            setCurrentTime(data.time);
        });

        fetch('/cmd').then(res => res.json()).then(data => {
            setCurCmd(data.data);
        });

    }, [])

    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}

                <p>The current time is {currentTime}</p>
                <p>{currCmd}</p>

            </header>
        </div>
    );
}

export default App;
