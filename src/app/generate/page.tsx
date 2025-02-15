'use client';

import React, { useState } from 'react';
import crypto from 'crypto';

const CheckPasswordsPage = () => {
    // 10人分のニックネームを管理する状態
    const [nicknames, setNicknames] = useState<string[]>(['', '', '', '', '', '', '', '', '', '']);
    const [passwords, setPasswords] = useState<string[]>(Array(10).fill(''));
    const [errorMessage, setErrorMessage] = useState('');

    // ニックネームからハッシュ化してパスワードを生成する関数
    const generatePassword = (nickname: string) => {
        // ニックネームが空でない場合のみハッシュ化
        if (!nickname.trim()) {
            return ''; // 空欄の場合は空文字を返す
        }

        const hash = crypto.createHash('sha256'); // SHA-256でハッシュ化
        hash.update(nickname); // ニックネームをハッシュ化
        const hashedValue = hash.digest('hex'); // ハッシュ値を16進数で取得
        return hashedValue.substring(0, 10); // 最初の10文字を返す
    };

    // ニックネーム入力変更時の処理
    const handleNicknameChange = (index: number, value: string) => {
        const newNicknames = [...nicknames];
        newNicknames[index] = value; // 入力された値を更新
        setNicknames(newNicknames);
    };

    // パスワード生成処理
    const handleGeneratePasswords = () => {
        // 各ニックネームに対してパスワード（ハッシュ）を生成
        const newPasswords = nicknames.map((nickname) => generatePassword(nickname));
        setPasswords(newPasswords);
    };

    // パスワードをクリップボードにコピーする関数
    const copyPasswordToClipboard = (password: string) => {
        if (password) {
            navigator.clipboard.writeText(password)  // パスワードをクリップボードにコピー
                .then(() => alert('パスワードがコピーされました！'))
                .catch(() => alert('コピーに失敗しました。'));
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-start bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 overflow-auto">
                <h1 className="text-2xl font-semibold text-center mb-6">パスワード生成ページ</h1>
                <p className="text-center mb-4">最大10人のニックネームを入力し、それぞれのパスワード（ハッシュ）を生成します。</p>

                {/* ページの見える範囲に確認用のテキスト */}
                <p className="text-center text-gray-500 mb-6">ページが更新されているか確認してください。</p>

                {/* ニックネーム入力フォーム */}
                <div className="space-y-4">
                    {nicknames.map((nickname, index) => (
                        <div key={index} className="flex items-center space-x-4 mb-4">
                            <div className="flex-1">
                                <label htmlFor={`nickname-${index}`} className="block text-sm font-medium text-gray-700">ニックネーム {index + 1}</label>
                                <input
                                    id={`nickname-${index}`}
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => handleNicknameChange(index, e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="ニックネームを入力"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">パスワード</label>
                                <input
                                    type="text"
                                    value={passwords[index] || ''}
                                    readOnly
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="生成されたパスワード"
                                />
                            </div>
                            <button 
                                onClick={() => copyPasswordToClipboard(passwords[index])}
                                className="text-blue-500 mt-4"
                            >
                                コピー
                            </button>
                        </div>
                    ))}
                </div>

                {/* パスワード生成ボタン */}
                <button 
                    onClick={handleGeneratePasswords} 
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                >
                    パスワード生成
                </button>
            </div>
        </div>
    );
};

export default CheckPasswordsPage;
