import React from 'react';
import '../assets/css/auth.css';
import Logo from '@/components/Logo';

export default function Auth({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center sm:pt-0 bg-gray-100">
            <Logo dark/>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
