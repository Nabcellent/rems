import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import '../assets/css/guest.css';
import logo from '@/assets/images/logo.svg';
import logoDarkSvg from '@/assets/images/logo-dark.svg';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center sm:pt-0 bg-gray-100">
            <div>
                <Link href="/" className="logo logo-dark">
                    <span className="logo-sm"><img src={logo} alt="" height="37"/></span>
                    <span className="logo-lg"><img src={logoDarkSvg} alt="" height="30"/></span>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
