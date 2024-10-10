import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Static username and password
const staticUser = {
    username: 'user',
    password: 'password123'
};

// Login Component
function User() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();

        if (username === staticUser.username && password === staticUser.password) {
            localStorage.setItem('user_auth', 'true');

            navigate('/')
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className='text-3xl text-white '>User Login</h1>
            <form className="w-full max-w-sm" onSubmit={handleLogin}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-full-name"
                        >
                            User Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-password"
                        >
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            
                            type="password"
                            placeholder="*******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3" />
                    <div className="md:w-2/3">
                        <button
                            className="shadow bg-gradient-to-r from-yellow-500 to-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default User;