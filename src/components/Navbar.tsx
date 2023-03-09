import Link from 'next/link';

const Navbar: React.FC = (): JSX.Element => {
    return (
        <nav className='sticky top-0 z-50 w-full px-4 py-2 text-black '>
            <div className='mx-auto flex max-w-7xl justify-between'>
                <div className='text-lg font-bold'>
                    <Link href='/'>Podcaster</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
