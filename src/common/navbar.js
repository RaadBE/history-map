import React from 'react';
import './Navbar.css'
    const First = () => {
        return (
            <nav>
                <div className='nav-bar'>
                    <div style={{ alignSelf: 'center' }}>Tabula</div>
                    <ul>
                        <li>
                            <a href="/">How to Use</a>
                        </li>
                        <li>
                            <a href="/blog">About Us</a>
                        </li>
                        <li>
                            <a href="/projects">Contribute</a>
                        </li>
                        <li>
                            <a href="/about">Get Started</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

    export default First;