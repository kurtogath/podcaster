import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = (): JSX.Element => {
    return (
        <>
            <nav className='fixed top-0 z-50 w-full bg-white px-4 pt-4'>
                <div className='mx-auto mb-1 flex max-w-7xl justify-between'>
                    <div className='app-title text-lg font-bold '>
                        <Link href='/'>Podcaster</Link>
                    </div>
                </div>
                <div className='h-0.5 bg-gray-300' />
            </nav>
        </>
    );
};

export default Navbar;
