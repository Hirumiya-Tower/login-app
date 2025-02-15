'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import crypto from 'crypto';

const LoginPage = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const generatePassword = (nickname: string) => {
        const hash = crypto.createHash('sha256');
        hash.update(nickname); 
        const hashedValue = hash.digest('hex'); 
        return hashedValue.substring(0, 10);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); 

        const generatedPassword = generatePassword(nickname);

        if (generatedPassword === password) {
            router.push('/welcome');
        } else {
            setErrorMessage('ニックネームまたはパスワードが間違っています');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-semibold text-center mb-6">ログインページ</h1>
                
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">ニックネーム</label>
                        <input
                            id="nickname"
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                        ログイン
                    </button>
                </form>

                {errorMessage && (
                    <p className="mt-4 text-center text-red-500">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default LoginPage;